// ============================================================
// src/index.js — punto de entrada: importa todo y ejecuta una demo
// ============================================================
import chalk from "chalk";                       // paquete de npm: sin "./", se busca en node_modules
import Tarea, { TareaConFecha } from "./tarea.js"; // default + con nombre en la misma línea
import { ListaTareas } from "./lista.js";
import { capitalizar, formatearFecha } from "./utils.js";

// ---- Pintar una tarea según su estado (chalk) ----
function pintar(tarea, indice) {
  const texto = `${indice}. ${tarea}`;              // `${tarea}` llama a toString()
  if (tarea.completada) return chalk.green(texto);  // completada → verde
  if (tarea.vencida) return chalk.red(texto);       // vencida → rojo (solo TareaConFecha la tiene)
  return chalk.yellow(texto);                       // pendiente → amarillo
}

function mostrar(lista) {
  console.log(chalk.bold(`\nMis tareas · ${formatearFecha(new Date())}`));
  lista.tareas.forEach((t, i) => console.log(pintar(t, i)));
  console.log(chalk.cyan(`Progreso: ${lista.progreso}%`));
}

// ---- Demo ----
const lista = new ListaTareas();

lista.agregar(capitalizar("  estudiar MÓDULOS de JS "));        // → "Estudiar módulos de js"
lista.agregar("Entrenar");
lista.agregar(Tarea.desdeObjeto({ titulo: "Leer capítulo 12", completada: true }));
lista.agregar(new TareaConFecha("Entregar parcial", "2026-01-15T12:00:00"));
lista.agregar(new TareaConFecha("Proyecto final", "2027-06-30T12:00:00"));

lista.completar(1);
mostrar(lista);

// Errores del capítulo 11, ahora con módulos
try {
  lista.completar(99);
} catch (error) {
  console.log(chalk.red(`\n✘ ${error.name}: ${error.message}`));
}

console.log(chalk.gray(`\nPendientes: ${lista.pendientes().map((t) => t.titulo).join(", ")}`));
