// ============================================================
// src/lista.js — la clase ListaTareas
// ============================================================
import Tarea from "./tarea.js"; // default import: sin llaves

// Export con nombre (con llaves al importar)
export class ListaTareas {
  #tareas = [];

  agregar(tituloOTarea) {
    const tarea = tituloOTarea instanceof Tarea ? tituloOTarea : new Tarea(tituloOTarea);
    this.#tareas.push(tarea);
    return tarea;
  }

  completar(indice) {
    const tarea = this.#tareas[indice];
    if (!tarea) throw new RangeError(`No existe la tarea ${indice}`); // capítulo 11: lanzar, no esconder
    tarea.completar();
  }

  pendientes() {
    return this.#tareas.filter((t) => !t.completada);
  }

  get progreso() {
    if (this.#tareas.length === 0) return 0;
    const hechas = this.#tareas.filter((t) => t.completada).length;
    return Math.round((hechas / this.#tareas.length) * 100);
  }

  // Getter de solo lectura: devuelve una COPIA del array privado.
  // Así index.js puede recorrer las tareas, pero no puede hacer push ni borrar en #tareas.
  get tareas() {
    return [...this.#tareas];
  }
}
