// src/gasto.js

export class Gasto {
  static #siguienteId = 1;   // 1. contador compartido por TODOS los gastos
  #centavos;                 // 2. el monto, privado y en centavos

  // 3. recibe UN objeto y lo desestructura; fecha tiene valor por defecto
  constructor({ descripcion, monto, categoria, fecha = new Date() }) {
    this.id = Gasto.#siguienteId++;           // 4. toma el número actual y lo incrementa
    this.descripcion = descripcion;
    this.#centavos = Math.round(monto * 100); // 5. bolivianos → centavos, redondeado
    this.categoria = categoria;
    this.fecha = fecha;
  }

  // 6. getters: se leen como propiedades, sin paréntesis
  get monto() {
    return this.#centavos / 100;
  }

  get centavos() {
    return this.#centavos;
  }
}