


//1. FizzBuzz (clásico de entrevista): imprime los números del 1 al 100, 
// pero “Fizz” para múltiplos de 3
//“Buzz” para múltiplos de 5 y “FizzBuzz” para múltiplos de ambos.
console.log("\n=== 1. FizzBuzz ===");

function fizzBuzz(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 3 == 0 && i % 5 == 0) {
            console.log("FizzBuzz");
        } else if (i % 3 == 0) {
            console.log("Fizz");
        } else if (i % 5 == 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}

console.log(fizzBuzz(100));




//2. Escribe clasificarNota(nota) con guardas: si no es número o está fuera de 0–100, devuelve
//"inválida" ; si no, la categoría.
console.log("\n=== 2. Clasificar nota ===");
function clasificarNota(nota) {
  if (typeof nota !== "number" || Number.isNaN(nota)) return "inválida";
  if (nota < 0 || nota > 100) return "inválida";

  // aquí ya sabemos que es un número entre 0 y 100
  if (nota >= 90) return "A";
  if (nota >= 70) return "B";
  if (nota >= 51) return "C";
  return "D";
}

console.log(clasificarNota(75)); // A
console.log(clasificarNota(102));



//3. Con un switch , convierte un número de mes (1–12) en su estación en Bolivia (hemisferio sur).
console.log("\n=== 3. Estaciones ===");
function estaciones(numeroMes) {
    switch (numeroMes) {
        case 12:
        case 1:
        case 2:
            return "Verano";
        case 3:
        case 4:
        case 5:
            return "Otoño";
        case 6:
        case 7:
        case 8:
            return "Invierno";
        case 9:
        case 10:
        case 11:
            return "Primavera";
        default:
            return "Mes inválido";
    }   
}

console.log(estaciones(3)); // Primavera
console.log(estaciones(13)); // Mes inválido





//4. Dado const precios = [12, 0, 45, -3, 30] , suma solo los positivos usando continue , y
//detente con break si encuentras un precio mayor a 40.
console.log("\n=== 4. Suma de precios positivos ===");

const precios = [12, 0, 45, -3, 30];
let suma = 0;

for (const precio of precios) {
  if (precio > 40) break;      // 1. detenerse primero
  if (precio <= 0) continue;   // 2. saltar los no positivos
  suma += precio;              // 3. sumar
}
console.log(suma); // → 12





//5. Recorre el objeto { js: 3, python: 5, dart: 2 } con for...in e imprime “Llevo X años con LENGUAJE”.
console.log("\n=== 5. Experiencia ===");
const experiencia = { js: 3, python: 5, dart: 2 };
for (const lenguaje in experiencia) {
    console.log(`Levo ${experiencia[lenguaje]} años de experiencia en ${lenguaje}`);
}



//6. Dibuja con bucles anidados un triángulo de asteriscos de 5 filas
console.log("\n=== 6. Triángulo de asteriscos ===");

function estrella(n) {
    for (let i = 1; i <= n; i++) {
        let fila = "";
        for (let j = 1; j <= i; j++) {
            fila += "*";
        }
        console.log(fila);
    }
}

console.log(estrella(5));




