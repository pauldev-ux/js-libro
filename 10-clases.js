
/*
  PRÁCTICA · Capítulo 10: Clases y programación orientada a objetos
  Archivo: 10-clases.js

  1. Crea una clase Tarea con titulo, completada = false, creadaEn (fecha actual)
     y los métodos completar() y toString().

  2. Crea ListaTareas con un campo privado #tareas, y los métodos agregar(titulo),
     completar(indice), pendientes() y un getter progreso que devuelva el
     porcentaje completado.

  3. Agrega a Tarea un método estático desdeObjeto({ titulo, completada }).

  4. Crea TareaConFecha extends Tarea que agregue fechaLimite y un getter vencida.
     Sobrescribe toString() usando super.toString().

  5. Comprueba con Object.hasOwn que completar no está en la instancia sino en
     el prototipo.

  6. Esta es tu app de tareas de practica-git, ahora en POO con JS.
     Súbela a GitHub.
*/



// ------------------------------------------------------------
// 1. Clase Tarea  +  3. método estático desdeObjeto
// ------------------------------------------------------------
class Tarea {
  // Campos de clase: valores iniciales, iguales para todas las instancias
  completada = false;
  creadaEn = new Date(); // fecha y hora en que se creó la tarea
 
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

  // ✚ AGREGADO (ejercicio 3): método estático = se llama sobre la CLASE, no sobre una tarea
  static desdeObjeto({ titulo, completada = false }) {
    const tarea = new Tarea(titulo);
    if (completada) tarea.completar();
    return tarea;
  }


}

console.log("\n=== 1. Clase Tarea  ===");
const tarea1 = new Tarea("Aprender JavaScript");
console.log(tarea1.toString());     // → [ ] Aprender JavaScript
tarea1.completar();
console.log(tarea1.toString());     // → [x] Aprender JavaScript





// ------------------------------------------------------------
// 3. Método estático desdeObjeto
// ------------------------------------------------------------
console.log("\n=== 3. Tarea.desdeObjeto ===");
const tarea2 = Tarea.desdeObjeto({ titulo: "Leer capítulo 10", completada: true });
console.log(tarea2.toString());   // → [x] Leer capítulo 10
console.log(tarea2 instanceof Tarea); // → true





// ------------------------------------------------------------
// 2. ListaTareas con campo privado #tareas
// ------------------------------------------------------------
class ListaTareas {
    #tareas = [];

    agregar(titulo) {
        // Acepta un título (string) o una Tarea ya creada (útil para TareaConFecha)
        const tarea = titulo instanceof Tarea ? titulo : new Tarea(titulo);
        this.#tareas.push(tarea);
        return tarea;
    }

    completar(indice) {
        if (indice >= 0 && indice < this.#tareas.length) {
            this.#tareas[indice].completar();
        }else {
            console.log(`No existe la tarea ${indice}`);
        }
    }

    pendientes() {
        return this.#tareas.filter(tarea => !tarea.completada);
    }   

    get progreso() {
        if (this.#tareas.length === 0) return 0; // guarda: evita dividir entre 0
        const hechas = this.#tareas.filter((tarea) => tarea.completada).length;
        return Math.round((hechas / this.#tareas.length) * 100);
    }

    mostrar() {
    this.#tareas.forEach((t, i) => console.log(`${i}. ${t}`));
    console.log(`Progreso: ${this.progreso}%`);
    }

}

console.log("\n=== 2. ListaTareas ===");
const lista = new ListaTareas();
lista.agregar("Estudiar JS");
lista.agregar("Entrenar");
lista.agregar("Leer");
lista.completar(1);
lista.completar(9);                     // → No existe la tarea 9
lista.mostrar();
// → 0. [ ] Estudiar JS
// → 1. [x] Entrenar
// → 2. [ ] Leer
// → Progreso: 33%


console.log("Pendientes:", lista.pendientes().map((t) => t.titulo)); // → [ 'Entrenar', 'Leer' ]
console.log(lista.tareas);  // → undefined: #tareas no es accesible desde afuera
// lista.#tareas            // ✘ SyntaxError: ni siquiera se puede escribir fuera de la clase




// ------------------------------------------------------------
// 4. Herencia: TareaConFecha extends Tarea
// ------------------------------------------------------------
console.log("\n=== 4. TareaConFecha ===");
class TareaConFecha extends Tarea{
    constructor(titulo, fechaLimite){
        super(titulo);
        this.fechaLimite = new Date(fechaLimite);
    }

    // ✚ AGREGADO: getter vencida = no completada Y con la fecha límite ya pasada
    get vencida() {
        return !this.completada && this.fechaLimite < new Date();
     }
 
  // ✚ AGREGADO: sobrescribe toString reutilizando el del padre con super
    toString() {
        const base = super.toString(); // "[ ] título" (el toString de Tarea)
        const fecha = this.fechaLimite.toLocaleDateString("es-BO");
        return `${base} (vence: ${fecha})${this.vencida ? "VENCIDA" : ""}`;
    }
    
}


const atrasada = new TareaConFecha("Entregar parcial", "2026-01-15T12:00:00");
const aTiempo = new TareaConFecha("Proyecto final", "2027-06-30T12:00:00");
console.log(atrasada.toString()); // → [ ] Entregar parcial (vence: 15/1/2026) ⚠ VENCIDA
console.log(aTiempo.toString());  // → [ ] Proyecto final (vence: 30/6/2027)
 
atrasada.completar();             // método heredado de Tarea
console.log(atrasada.toString()); // → [x] Entregar parcial (vence: 15/1/2026)
 
// Como TareaConFecha ES una Tarea, la lista la acepta tal cual
lista.agregar(aTiempo);
lista.mostrar();
 
// ------------------------------------------------------------
// 5. ✚ AGREGADO: prototipos
// ------------------------------------------------------------
console.log("\n=== 5. Prototipos ===");
console.log(Object.hasOwn(tarea1, "titulo"));              // → true:  dato propio de la instancia
console.log(Object.hasOwn(tarea1, "completar"));           // → false: el método NO está en la instancia
console.log(Object.hasOwn(Tarea.prototype, "completar"));  // → true:  vive en el prototipo
console.log(tarea1.completar === tarea2.completar);        // → true:  todas comparten el mismo método





