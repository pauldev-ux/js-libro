/* P R Á CT I CA
En 02-variables.js :
1. Declara con const tu nombre, tu carrera y tu año de ingreso. Con let , un contador de horas
de estudio que incrementas tres veces. */
const nombre = "Paul";
const carrera = "Ingeniería en Sistemas";
const anio = 2024;

let horasEstudio = 0;
horasEstudio++;
horasEstudio++;
horasEstudio++;
console.log('===1. Datos personales===');
console.log(`Nombre: ${nombre}`);
console.log(`Carrera: ${carrera}`);
console.log(`Año de ingreso: ${anio}`);
console.log(`Horas de estudio: ${horasEstudio}`);





/* 2. Escribe una tabla con console.log que muestre typeof de 8 valores distintos, incluidos null
y un array. */
console.log("\n=== 2. typeof ===");
console.table([
    {valor: 'Paul', tipo: typeof 'Paul'},
    {valor: 25, tipo: typeof 25},
    {valor: 25n, tipo: typeof 25n},
    {valor: true, tipo: typeof true},
    {valor: undefined, tipo: typeof undefined},
    {valor: null, tipo: typeof null},
    {valor: {}, tipo: typeof {}},
    {valor: [], tipo: typeof []}
]);


/*  null, {} y [] dan "object" los tres. Para distinguirlos:
   - null   → se compara directo:    valor === null
   - array  → Array.isArray(valor)   → true
   - objeto → typeof valor === "object" && valor !== null && !Array.isArray(valor) */
console.log("¿[] es array?", Array.isArray([])); // → true
console.log("¿{} es array?", Array.isArray({})); // → false
console.log("¿null es null?", null === null);    // → true




//3. Predice y luego comprueba: ¿qué imprime este código y por qué?
console.log("\n=== 3. Referencia ===");
const a = [1, 2];
const b = a; //b NO es una copia: apunta al MISMO array que a
b.push(3);
console.log(a, a === b);  //imprime [1,2,3] , true





// ------------------------------------------------------------
// 4. Errores provocados a propósito
// ------------------------------------------------------------
// Un error no atrapado DETIENE el programa. Con try/catch lo atrapamos,
// mostramos el mensaje y el programa sigue con lo que viene después.
console.log("\n=== 4. Errores ===");
 
// 4a. TDZ (Temporal Dead Zone)
// "edad" existe desde el inicio del bloque (hoisting), pero no se puede
// usar hasta la línea de su declaración. Ese tramo es la TDZ.
try {
  console.log(edad); // ✘ se usa ANTES de declararla
  let edad = 22;
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
  // ReferenceError: Cannot access 'edad' before initialization
}
 
// 4b. Reasignar una const
try {
  const pais = "Bolivia";
  pais = "Perú"; // ✘ una const no se puede reasignar
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
  // TypeError: Assignment to constant variable.
}
 
// Aunque un const no se reasigna, su CONTENIDO sí puede cambiar si es un objeto:
const lenguajes = ["Python"];
lenguajes.push("JavaScript"); // ✔ permitido: no reasignamos, modificamos
console.log(lenguajes);       // → [ 'Python', 'JavaScript' ]
 
console.log("El programa siguió gracias a try/catch ✔");
 



// ------------------------------------------------------------
// 5. Scope de bloque
// ------------------------------------------------------------
/*Explica en un comentario, con tus palabras, qué es el scope de bloque:
Un bloque es cualquier código entre llaves { }: el de un if, un for,
  un while, una función o unas llaves sueltas.
 
  Las variables declaradas con let o const dentro de un bloque solo existen
  dentro de ese bloque: al salir de él, ya no se pueden usar.
 
  - Desde DENTRO se pueden usar las variables de AFUERA.
  - Desde AFUERA NO se pueden usar las de ADENTRO.
  - var NO respeta el bloque: se "escapa" y se ve afuera. Por eso no se usa. */

console.log("\n=== 5. Scope de bloque ===");
const deAfuera = "soy de afuera";
 
if (true) {
  const deAdentro = "soy de adentro";
  var escapista = "soy var, me escapo";
  console.log(deAfuera);  // ✔ desde dentro se ve lo de afuera
  console.log(deAdentro); // ✔
}
 
console.log(escapista); // ✔ var se ve afuera del if (mal comportamiento)
try {
  console.log(deAdentro); // ✘ const quedó encerrada en el bloque
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
  // ReferenceError: deAdentro is not defined
}