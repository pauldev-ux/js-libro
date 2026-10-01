// ============================================================
// Capítulo 4 · Práctica: strings y números
// ============================================================
 
// ------------------------------------------------------------
// 1. formatearNombre " pAUL montenegro " -> "Paul Montenegro"
// ------------------------------------------------------------
console.log("=== 1. formatearNombre ===");


function formatearNombre(texto) {
    // trim(): quita los espacios del inicio y del final → "pAUL montenegro"
    // split(/\s+/): corta el texto en cada espacio en blanco y devuelve un ARRAY → ["pAUL", "montenegro"]
    const palabras = texto.trim().split(/\s+/); 
    for (let i = 0; i < palabras.length; i++) {
        palabras[i] = palabras[i].charAt(0).toUpperCase() + palabras[i].slice(1).toLowerCase();
    }
    // charAt(0): devuelve el primer carácter → "p"
    // toUpperCase(): lo pasa a mayúscula → "P"
    // slice(1): devuelve el resto del texto desde la posición 1 → "AUL"
    // toLowerCase(): lo pasa a minúscula → "aul"
    // +: une ambas partes → "Paul", y lo guarda en la misma posición del array

    return palabras.join(" ");
    // join(" "): une el array en un solo texto, con un espacio entre palabras ["Paul", "Montenegro"] → "Paul Montenegro"
}


console.log(formatearNombre(" pAUL     montenegro "));






// ------------------------------------------------------------
// 2. esPalindromo
// ------------------------------------------------------------
console.log("\n=== 2. esPalindromo ===");

function esPalindromo(texto) {
    // toLowerCase(): pasa todo a minúscula → "anita lava la tina"
    // replace(/\s+/g, ""): quita todos los espacios en blanco → "anitalavalatina"
    const textoLimpio = texto.toLowerCase().replace(/\s+/g, "");
    const textoReverso = textoLimpio.split("").reverse().join("");
    return textoLimpio === textoReverso;
}

console.log(esPalindromo("Anita lava la tina")); // true




// ------------------------------------------------------------
// 3. Carrito en centavos
// ------------------------------------------------------------
console.log("\n=== 3. Carrito ===");
 
const precios = [12.5, 19.99, 30.75];
 
// El problema que evitamos al trabajar en centavos:
console.log("Suma directa:", 12.5 + 19.99 + 30.75); // → 63.239999999999995  ✘
console.log("0.1 + 0.2 =", 0.1 + 0.2);             // → 0.30000000000000004
 
let totalCentavos = 0;
for (const precio of precios) {
  totalCentavos += Math.round(precio * 100);
  // Math.round es necesario: 19.99 * 100 da 1998.9999999999998, no 1999
}
console.log("19.99 * 100 =", 19.99 * 100);     // → 1998.9999999999998
console.log("Total en centavos:", totalCentavos); // → 6324 (entero, exacto)
 
const total = totalCentavos / 100; // volvemos a bolivianos solo al final
const formatoBs = new Intl.NumberFormat("es-BO", { style: "currency", currency: "BOB" });
console.log("Total:", formatoBs.format(total)); // → Bs 63,24



 
// ------------------------------------------------------------
// 4. Código de verificación de 6 dígitos
// ------------------------------------------------------------
console.log("\n=== 4. Código de verificación ===");

function generarCodigo(){
    const numeros = Math.floor(Math.random() * 1000000); // genera un número aleatorio entre 0 y 999999
    return numeros.toString().padStart(6, "0"); // convierte a string y rellena con ceros a la izquierda hasta 6 dígitos
}

console.log("Código generado:", generarCodigo());

// Ejemplo de cómo actúa padStart:
console.log(String(42).padStart(6, "0")); // → 000042



// ------------------------------------------------------------
// 5. Number, parseFloat y parseInt
// ------------------------------------------------------------
console.log("\n=== 5. Conversiones ===");
 
const textos = ["19.99", "19.99 Bs", "Bs 19.99"];
console.table(
  textos.map((t) => ({
    texto: t,
    Number: Number(t),
    parseFloat: parseFloat(t),
    parseInt: parseInt(t, 10),
  }))
);
 
/*
                Number    parseFloat    parseInt
"19.99"         19.99     19.99         19
"19.99 Bs"      NaN       19.99         19
"Bs 19.99"      NaN       NaN           NaN
 
Por qué difieren:
- Number es ESTRICTO: todo el string debe ser un número válido (solo admite
  espacios en los extremos). " Bs" sobra → NaN.
- parseFloat lee DESDE EL INICIO mientras haya un número válido y se detiene en
  lo primero que no lo es. En "19.99 Bs" lee 19.99 y para en el espacio.
- parseInt lee igual que parseFloat, pero solo DÍGITOS: se detiene en el punto.
  Por eso da 19. No redondea, CORTA.
- "Bs 19.99" da NaN en los tres: parseFloat y parseInt empiezan a leer por el
  principio, encuentran "B" (que no es un número) y se rinden de inmediato.
  Para leerlo habría que quitar el texto antes: parseFloat("Bs 19.99".replace("Bs", ""))
*/
console.log(parseFloat("Bs 19.99".replace("Bs", ""))); // → 19.99