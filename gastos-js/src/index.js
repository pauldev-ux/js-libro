// src/index.js
// Punto de entrada: pruebas de los ejercicios 2, 3 y 4

import { formatearBs, formatearFecha } from "./utils.js";
import { ValidacionError, PresupuestoExcedidoError } from "./errores.js";
import { Gasto } from "./gasto.js";

// ------------------------------------------------------------
// Ejercicio 2 · Fechas y moneda
// ------------------------------------------------------------
console.log("=== Ejercicio 2 · Formato ===");
console.log(formatearBs(25.5));
console.log(formatearBs(1234.5));
console.log(formatearBs(123.45));
console.log(formatearFecha(new Date()));

// ------------------------------------------------------------
// Ejercicio 3 · Errores personalizados
// ------------------------------------------------------------
console.log("\n=== Ejercicio 3 · Errores ===");
try {
  throw new ValidacionError("monto", "El monto debe ser mayor que 0");
} catch (error) {
  console.log(error.name, "→", error.message, "→ campo:", error.campo);
  console.log("¿Es un Error?", error instanceof Error);
}

try {
  throw new PresupuestoExcedidoError(1000, 1850);
} catch (error) {
  console.log(error.name, "→", error.message);
  console.log("Exceso:", error.exceso);
}

// ------------------------------------------------------------
// Ejercicio 4A · Gastos: id automático y centavos
// ------------------------------------------------------------
console.log("\n=== Ejercicio 4A · Gastos ===");
// Los montos van como NÚMEROS (25.5), no como texto ('25.5'): la validación rechaza texto
const almuerzo = new Gasto({ descripcion: "Almuerzo", monto: 25.5, categoria: "comida" });
const curso = new Gasto({ descripcion: "Curso", monto: 19.99, categoria: "educacion" });
const micro = new Gasto({
  descripcion: "Micro",
  monto: 3.5,
  categoria: "transporte",
  fecha: new Date("2026-09-15T12:00:00"), // fecha a mano, para probar el parámetro opcional
});

console.log("IDs:", almuerzo.id, curso.id, micro.id);
console.log("Almuerzo:", almuerzo.monto, "Bs =", almuerzo.centavos, "centavos");
console.log("Curso:", curso.monto, "Bs =", curso.centavos, "centavos");
console.log("Sin redondear sería:", 19.99 * 100);
console.log("Fecha del micro:", formatearFecha(micro.fecha));

// ------------------------------------------------------------
// Ejercicio 4B · toString y validaciones
// ------------------------------------------------------------
console.log("\n=== Ejercicio 4B · toString ===");
console.log(`${almuerzo}`);
console.log(`${curso}`);
console.log(`${micro}`);

console.log("\n=== Ejercicio 4B · Validaciones ===");
// Cada uno debe fallar por un motivo distinto
const pruebas = [
  { descripcion: "ab", monto: 10, categoria: "comida" },
  { descripcion: "Pasaje", monto: -5, categoria: "transporte" },
  { descripcion: "Pasaje", monto: "10", categoria: "transporte" },
  { descripcion: "Vuelo a La Paz", monto: 500, categoria: "viajes" },
  { descripcion: "Pizza 🍕", monto: 40, categoria: "comida" },
];

for (const datos of pruebas) {
  try {
    new Gasto(datos);
    console.log("✔ Creado:", datos.descripcion);
  } catch (error) {
    if (error instanceof ValidacionError) {
      console.log(`✘ [${error.campo}] ${error.message}`);
    } else {
      throw error; // un error que no esperábamos: no lo escondemos
    }
  }
}

// Los inválidos no consumieron ids: este debe ser el #4
const cafe = new Gasto({ descripcion: "Café con leche", monto: 8, categoria: "comida" });
console.log(`${cafe}`);