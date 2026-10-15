// ============================================================
// src/tarea.js — la clase Tarea y su subclase TareaConFecha
// ============================================================
import { formatearFecha } from "./utils.js"; // import con nombre: lleva llaves y extensión .js

// export default: lo "principal" del archivo. Se importa SIN llaves y con el nombre que quieras.
export default class Tarea {
  completada = false;
  creadaEn = new Date();

  constructor(titulo) {
    this.titulo = titulo;
  }

  completar() {
    this.completada = true;
  }

  toString() {
    const marca = this.completada ? "[x]" : "[ ]";
    return `${marca} ${this.titulo}`;
  }

  static desdeObjeto({ titulo, completada = false }) {
    const tarea = new Tarea(titulo);
    if (completada) tarea.completar();
    return tarea;
  }
}

// export con nombre: un archivo puede tener varios. Se importa CON llaves.
export class TareaConFecha extends Tarea {
  constructor(titulo, fechaLimite) {
    super(titulo);
    this.fechaLimite = new Date(fechaLimite);
  }

  get vencida() {
    return !this.completada && this.fechaLimite < new Date();
  }

  toString() {
    const aviso = this.vencida ? " ⚠ VENCIDA" : "";
    return `${super.toString()} (vence: ${formatearFecha(this.fechaLimite)})${aviso}`;
  }
}
