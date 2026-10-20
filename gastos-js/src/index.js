import { formatearBs, formatearFecha } from "./utils.js";
import { ValidacionError, PresupuestoExcedidoError } from "./errores.js";
import { Gasto } from "./gasto.js"


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

//Gastos
const almuerzo = new Gasto({descripcion : 'Almuerzo', monto : '25.5', categoria : 'comida'});
const curso = new Gasto({descripcion: 'Curso', monto:'19.99', categoria:'educacion'});
const micro = new Gasto({
    descripcion: 'Micro', 
    monto:'3.5', 
    categoria:'transporte', 
    fecha: new Date()});


console.log("IDs:", almuerzo.id, curso.id, micro.id);
console.log("Almuerzo:", almuerzo.monto, "Bs =",almuerzo.centavos, "centavos" );
console.log("Curso:", curso.monto, "Bs =", curso.centavos, "centavos");
console.log("Sin redondear sería:", 19.99 * 100);
console.log("Fecha del micro:", micro.fecha.toLocaleDateString("es-BO"));
console.log(almuerzo)




