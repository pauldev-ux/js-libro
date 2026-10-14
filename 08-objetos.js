
const libro = {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    anio: 1943,
    genero: ["Ficción", "Aventura", "Filosofía"],
    resumen: function() {
        return `${this.titulo} es un libro escrito por ${this.autor} en el año ${this.anio}. Pertenece a los géneros: ${this.genero.join(", ")}.`;
    }  
}

console.log("=== 1. Objeto libro ===");
console.log(libro);
console.log(libro.resumen());



///2. Escribe contarPalabras(texto) que devuelva un objeto con cuántas veces aparece cada palabra.
console.log("\n=== 2. contarPalabras ===");
function contarPalabras(texto) {
    const palabras = texto.toLowerCase().match(/\b\w+\b/g); // Convertir a minúsculas y extraer palabras
    const conteo = {};

    for (const palabra of palabras) {
    if (palabra === "") continue;                    // por si el texto empieza o termina con espacios
    conteo[palabra] = (conteo[palabra] ?? 0) + 1;
    // conteo[palabra] usa CORCHETES porque la clave está en una variable.
    // Si la palabra aún no existe, conteo[palabra] es undefined → ?? 0 lo convierte en 0.
  }
  return conteo;
}
 
console.log(contarPalabras("el perro y el gato y el loro")); // → { el: 3, perro: 1, y: 2, gato: 1, loro: 1 }



//3. Dado const precios = { cafe: 12, te: 8, jugo: 15 } , crea con Object.entries y
//Object.fromEntries un objeto nuevo con los precios aumentados un 10 %.

 




console.log("\n=== 3. Precios +10 % ===");
 
const precios = { cafe: 12, te: 8, jugo: 15 };
 
const pares = Object.entries(precios);
console.log(pares); // → [ [ 'cafe', 12 ], [ 'te', 8 ], [ 'jugo', 15 ] ]   objeto → array de pares
 
const paresAumentados = pares.map(([producto, precio]) => [producto, Math.round(precio * 110) / 100]);
// [producto, precio] desestructura cada par. Math.round(… * 110) / 100 = +10 % redondeado a centavos
 
const preciosNuevos = Object.fromEntries(paresAumentados); // array de pares → objeto
console.log(preciosNuevos); // → { cafe: 13.2, te: 8.8, jugo: 16.5 }
console.log(precios);       // → { cafe: 12, te: 8, jugo: 15 }  (el original no cambió)
 
// Por qué redondear: sin Math.round
console.log(12 * 1.1); // → 13.200000000000001  (el problema de los decimales del capítulo 4)
 


// ------------------------------------------------------------
// 4. Copia superficial frente a profunda
// ------------------------------------------------------------
console.log("\n=== 4. Copias ===");
 
const perfil = {
  nombre: "Paul",
  redes: { github: "pauldev-ux", linkedin: "paul-montenegro" },
};
 
// Copia SUPERFICIAL: solo el primer nivel es nuevo; "redes" sigue siendo el MISMO objeto
const superficial = { ...perfil };
superficial.nombre = "Ana";                 // primer nivel: no afecta al original
superficial.redes.github = "copia-superficial";
 
console.log(perfil.nombre);       // → Paul                ✔ el original no cambió
console.log(perfil.redes.github); // → copia-superficial   ✘ ¡el original SÍ cambió!
console.log(perfil.redes === superficial.redes); // → true: comparten el objeto redes
 
// Restauramos el original para la siguiente prueba
perfil.redes.github = "pauldev-ux";
 
// Copia PROFUNDA: todos los niveles son nuevos
const profunda = structuredClone(perfil);
profunda.redes.github = "copia-profunda";
 
console.log(perfil.redes.github);   // → pauldev-ux      ✔ el original no cambió
console.log(profunda.redes.github); // → copia-profunda
console.log(perfil.redes === profunda.redes); // → false: son objetos distintos
 
// ------------------------------------------------------------
// 5. JSON ida y vuelta
// ------------------------------------------------------------
console.log("\n=== 5. JSON ===");
 
const texto = JSON.stringify(perfil, null, 2); // null = sin filtro; 2 = sangría de 2 espacios
console.log(texto);
console.log(typeof texto); // → string: JSON siempre es TEXTO
 
const deVuelta = JSON.parse(texto);
console.log(deVuelta.redes.github); // → pauldev-ux: de nuevo es un objeto
console.log(deVuelta === perfil);   // → false: es un objeto nuevo, con el mismo contenido
 
// ------------------------------------------------------------
// 6. Actualizar un objeto anidado SIN mutar
// ------------------------------------------------------------
console.log("\n=== 6. actualizarTema ===");
 
function actualizarTema(estado, tema) {
  // Se copia CADA nivel en el camino hasta lo que cambia, y se sobrescribe solo "tema"
  return {
    ...estado,                          // copia el nivel 1 (usuario, carrito, ...)
    usuario: {
      ...estado.usuario,                // copia el nivel 2 (nombre, preferencias, ...)
      preferencias: {
        ...estado.usuario.preferencias, // copia el nivel 3 (tema, idioma, ...)
        tema,                           // y sobrescribe solo tema (shorthand de tema: tema)
      },
    },
  };
}
 
const estado = {
  usuario: { nombre: "Paul", preferencias: { tema: "claro", idioma: "es" } },
  carrito: [],
};
 
const nuevoEstado = actualizarTema(estado, "oscuro");
console.log(estado.usuario.preferencias.tema);        // → claro   (original intacto)
console.log(nuevoEstado.usuario.preferencias.tema);   // → oscuro
console.log(nuevoEstado.usuario.preferencias.idioma); // → es      (no se perdió nada)
console.log(estado.carrito === nuevoEstado.carrito);  // → true: lo que no cambió se reutiliza
 
// ------------------------------------------------------------
// 7. Object.freeze
// ------------------------------------------------------------
console.log("\n=== 7. ROLES congelado ===");
 
const ROLES = Object.freeze({
  ADMIN: "admin",
  EDITOR: "editor",
  LECTOR: "lector",
});
 
ROLES.INVITADO = "invitado"; // en un archivo normal: se IGNORA en silencio
ROLES.ADMIN = "hacker";      // también se ignora
console.log(ROLES);                   // → { ADMIN: 'admin', EDITOR: 'editor', LECTOR: 'lector' }
console.log(Object.isFrozen(ROLES));  // → true
 
// En modo estricto, el mismo intento lanza un error en lugar de ignorarse
function agregarRolEstricto() {
  "use strict";
  ROLES.INVITADO = "invitado";
}
try {
  agregarRolEstricto();
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
  // → TypeError: Cannot add property INVITADO, object is not extensible
}


