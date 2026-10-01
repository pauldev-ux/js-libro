// ============================================================
// Capítulo 3 · Práctica: operadores
// ============================================================
 
// ------------------------------------------------------------
// 1. Par o impar con % y ternario
// ------------------------------------------------------------
console.log("=== 1. Par o impar ===");
const n = 7;
const resultado = n % 2 === 0 ? "par" : "impar";
//condición ? valorSiTrue : valorSiFalse
console.log(`${n} es ${resultado}`);

const numeros = [1, 2, 3, 4, 5];
for (let i = 0; i < numeros.length; i++) {
    const num = numeros[i];
    const resultado = num % 2 === 0 ? "par" : "impar";
    console.log(`${num} es ${resultado}`);
}






// ------------------------------------------------------------
// 2. Predicciones
// ------------------------------------------------------------
console.log("\n=== 2. Predicciones ===");

// "8" + 2 → "82"
// Si un lado del + es string, + CONCATENA: el 2 se convierte en "2".
console.log('"8" + 2 =', "8" + 2);


// "8" - 2 → 6
// El - solo sabe restar números, así que convierte "8" en 8.
console.log('"8" - 2 =', "8" - 2);


// true + true → 2
// En una suma numérica, true se convierte en 1: 1 + 1.
console.log("true + true =", true + true);


// null ?? "x" → "x"
// ?? usa el valor de la derecha solo si el de la izquierda es null o undefined.
console.log('null ?? "x" =', null ?? "x");


// 0 || "x" → "x"
// || devuelve el primer valor TRUTHY. 0 es falsy, así que devuelve "x".
console.log('0 || "x" =', 0 || "x");


// 0 ?? "x" → 0
// El operador ?? devuelve el valor de la izquierda si no es null ni undefined, de lo contrario devuelve el valor de la derecha.
console.log("0 ?? \"x\" =", 0 ?? "x");


// "" && "hola" → ""
// El operador && devuelve el valor de la izquierda si es truthy, de lo contrario devuelve el valor de la derecha.
console.log('"" && "hola" =', "" && "hola");






// ------------------------------------------------------------
// 3. Optional chaining + nullish coalescing
// ------------------------------------------------------------
console.log("\n=== 3. ?. y ?? ===");
const perfil = {
  nombre: "Paul",
  carrera: "Ingeniería en Sistemas",
  // no tiene la propiedad "redes"
};
 
// perfil.redes es undefined.
// Sin ?. → perfil.redes.github lanzaría TypeError (leer .github de undefined).
// Con ?. → como redes es undefined, se detiene y devuelve undefined sin error.
// Luego ?? reemplaza ese undefined por "sin GitHub".
console.log(perfil.redes?.github ?? "sin GitHub"); // → sin GitHub
 
// Con redes, el mismo código devuelve el valor real
const perfilConRedes = { nombre: "Paul", redes: { github: "pauldev-ux" } };
console.log(perfilConRedes.redes?.github ?? "sin GitHub"); // → pauldev-ux





// ------------------------------------------------------------
// 4. Los 8 valores falsy
// ------------------------------------------------------------
console.log("\n=== 4. Valores falsy ===");
const falsy = [false, 0, -0, 0n, "", null, undefined, NaN];
 
for (const valor of falsy) {
  console.log(valor, "→", Boolean(valor));
}
// Nota: console.log muestra "" como una línea casi vacía y -0 como -0.
// Todos dan false. Cualquier otro valor ("0", "false", [], {}, -1) es truthy.
 




// ------------------------------------------------------------
// 5. Convertir "42.7kg" a número
// ------------------------------------------------------------
console.log("\n=== 5. Conversión ===");
const peso = "42.7kg";

console.log("parseFloat:", parseFloat(peso));   // → 42.7
// parseFloat lee de izquierda a derecha mientras encuentre un número válido
// (dígitos y UN punto decimal). Al llegar a "k" se detiene y devuelve 42.7.
 
console.log("parseInt:", parseInt(peso, 10));   // → 42
// parseInt lee igual, pero solo dígitos: se detiene en el "." y devuelve 42.
// No redondea: CORTA. El 10 indica que lea en base decimal.
 
console.log("Number:", Number(peso));           // → NaN
// Number es estricto: TODO el string debe ser un número válido.
// Como "kg" no lo es, devuelve NaN ("Not a Number").


