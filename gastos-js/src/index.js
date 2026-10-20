import { formatearBs, formatearFecha } from "./utils.js";
import { ValidacionError, PresupuestoExcedidoError } from "./errores.js";

//Fechas y Moneda
console.log(formatearBs(25.5));
console.log(formatearBs(1234.5));
console.log(formatearBs(123.45));
console.log(formatearFecha(new Date()));

//Errores
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



