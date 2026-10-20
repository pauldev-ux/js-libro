// src/gasto.js
// La clase Gasto: un gasto con id automático, monto en centavos y validaciones

import { ValidacionError } from "./errores.js";
import { formatearBs, formatearFecha } from "./utils.js";

// Reglas de validación, definidas una sola vez
const CATEGORIAS = new Set(["comida", "transporte", "educacion", "servicios", "ocio"]);
const REGEX_DESCRIPCION = /^[\p{L}\d ]{3,40}$/u; // letras (con tildes y ñ), números y espacios; 3 a 40

// Lanza un ValidacionError al primer dato inválido. No se exporta: es privada de este archivo.
function validar({ descripcion, monto, categoria }) {
  if (typeof descripcion !== "string" || !REGEX_DESCRIPCION.test(descripcion.trim())) {
    throw new ValidacionError(
      "descripcion",
      "La descripción debe tener de 3 a 40 caracteres: solo letras, números y espacios"
    );
  }
  if (typeof monto !== "number" || !Number.isFinite(monto) || monto <= 0) {
    throw new ValidacionError("monto", "El monto debe ser un número mayor que 0");
  }
  if (!CATEGORIAS.has(categoria)) {
    throw new ValidacionError(
      "categoria",
      `Categoría inválida: "${categoria}". Usa una de: ${[...CATEGORIAS].join(", ")}`
    );
  }
}

export class Gasto {
  static #siguienteId = 1; // contador compartido por todos los gastos
  #centavos;               // el monto, privado y en centavos

  constructor({ descripcion, monto, categoria, fecha = new Date() }) {
    validar({ descripcion, monto, categoria }); // primero validar: si falla, no se gasta un id

    this.id = Gasto.#siguienteId++;
    this.descripcion = descripcion.trim();
    this.#centavos = Math.round(monto * 100);   // bolivianos → centavos, sin errores de decimales
    this.categoria = categoria;
    this.fecha = fecha;
  }

  // Bolivianos: 2550 → 25.5
  get monto() {
    return this.#centavos / 100;
  }

  // Centavos enteros, para sumar sin errores de decimales
  get centavos() {
    return this.#centavos;
  }

  // #1 · 19/10/2026 · comida · Almuerzo · Bs 25,50
  toString() {
    return `#${this.id} · ${formatearFecha(this.fecha)} · ${this.categoria} · ${this.descripcion} · ${formatearBs(this.monto)}`;
  }
}