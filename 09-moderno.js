/*1. Dada la respuesta const resp = { data: { user: { name: "Paul", repos: 12 } }, status:
200 } , extrae en una sola línea name , repos y status , renombrando name a usuario .
2. Escribe crearBoton({ texto, color = "azul", deshabilitado = false }) que devuelva un
string describiendo el botón.
3. Intercambia dos variables con destructuring.
4. Escribe quitarCampo(obj, campo) que devuelva el objeto sin ese campo, sin mutar. Pista: rest
con clave calculada, const { [campo]: _, ...resto } = obj .
5. Con un Map , cuenta cuántas veces aparece cada palabra en una frase y muestra las 3 más
frecuentes.
6. Dados dos arrays de estudiantes inscritos en dos materias, usa Set para obtener: los que están
en ambas, los que están solo en la primera y el total de estudiantes distintos.
*/





// ============================================================
// Capítulo 9 · Práctica: destructuring, spread/rest, Map y Set
// ============================================================

// ------------------------------------------------------------
// 1. Destructuring anidado con renombrado
// ------------------------------------------------------------
console.log("=== 1. Destructuring anidado ===");

const resp = { data: { user: { name: "Paul", repos: 12 } }, status: 200 };

const { data: { user: { name: usuario, repos } }, status } = resp;
// Se lee de afuera hacia adentro, siguiendo la forma del objeto:
//   data: { ... }      → entra en resp.data   (data NO se crea como variable, es solo el camino)
//   user: { ... }      → entra en resp.data.user
//   name: usuario      → saca name y lo guarda con el nombre "usuario"
//   repos              → saca repos con el mismo nombre
//   status             → saca resp.status

console.log(usuario, repos, status); // → Paul 12 200
// console.log(name);  ✘ no existe: la renombramos a "usuario"
// console.log(data);  ✘ no existe: "data" solo era el camino








// ------------------------------------------------------------
// 2. Destructuring en parámetros con valores por defecto
// ------------------------------------------------------------
console.log("\n=== 2. crearBoton ===");

function crearBoton({ texto, color = "azul", deshabilitado = false }) {
  // La función recibe UN objeto y lo desestructura en la misma línea de parámetros.
  // color y deshabilitado tienen valor por defecto si no vienen en el objeto.
  const estado = deshabilitado ? "deshabilitado" : "activo";
  return `Botón "${texto}" de color ${color}, ${estado}`;
}

console.log(crearBoton({ texto: "Guardar" }));
// → Botón "Guardar" de color azul, activo
console.log(crearBoton({ texto: "Eliminar", color: "rojo", deshabilitado: true }));
// → Botón "Eliminar" de color rojo, deshabilitado
console.log(crearBoton({ deshabilitado: true, texto: "Enviar" }));
// → el ORDEN no importa: se empareja por nombre, no por posición









// ------------------------------------------------------------
// 3. Intercambiar variables
// ------------------------------------------------------------
console.log("\n=== 3. Intercambio ===");

let a = "café";
let b = "té";
[a, b] = [b, a];
// 1. A la derecha se crea un array con los valores actuales: ["té", "café"]
// 2. A la izquierda se desestructura por POSICIÓN: a = "té", b = "café"
console.log(a, b); // → té café










// ------------------------------------------------------------
// 4. Quitar un campo sin mutar (rest + clave calculada)
// ------------------------------------------------------------
console.log("\n=== 4. quitarCampo ===");

function quitarCampo(obj, campo) {
  const { [campo]: _, ...resto } = obj;
  // [campo]: _   → saca la propiedad cuyo nombre está en la variable "campo"
  //               y la guarda en "_" (convención para "no la voy a usar")
  // ...resto     → junta TODAS las demás propiedades en un objeto nuevo
  return resto;
}

const usuarioBD = { id: 1, nombre: "Paul", email: "paul@correo.com", password: "secreta" };
const publico = quitarCampo(usuarioBD, "password");

console.log(publico);   // → { id: 1, nombre: 'Paul', email: 'paul@correo.com' }
console.log(usuarioBD); // → sigue teniendo password: el original no se mutó
// Uso real: en un backend, para no enviar la contraseña al cliente.








// ------------------------------------------------------------
// 5. Map: contar palabras y mostrar las 3 más frecuentes
// ------------------------------------------------------------
console.log("\n=== 5. Map ===");

const frase = "el código limpio es código que el equipo entiende y el equipo mantiene";

const conteo = new Map();
for (const palabra of frase.split(" ")) {
  conteo.set(palabra, (conteo.get(palabra) ?? 0) + 1);
  // get devuelve undefined si la palabra aún no está → ?? 0 la empieza en 0
}

console.log(conteo.size, "palabras distintas"); // → 9 palabras distintas

const top3 = [...conteo]                 // Map → array de pares [palabra, veces]
  .sort((x, y) => y[1] - x[1])           // ordena por veces, de mayor a menor
  .slice(0, 3);                          // se queda con las 3 primeras

for (const [palabra, veces] of top3) {
  console.log(`${palabra}: ${veces}`);
}
// → el: 3
// → código: 2
// → equipo: 2










// ------------------------------------------------------------
// 6. Set: operaciones de conjuntos
// ------------------------------------------------------------
console.log("\n=== 6. Set ===");

const programacion = ["Ana", "Luis", "Paul", "Sofía", "Paul"]; // Paul repetido a propósito
const baseDeDatos = ["Paul", "Diego", "Sofía", "Carla"];

const setA = new Set(programacion); // el Set elimina el "Paul" repetido
const setB = new Set(baseDeDatos);

// Intersección: están en AMBAS → recorremos A y nos quedamos con los que B tiene
const enAmbas = [...setA].filter((e) => setB.has(e));
console.log("En ambas:", enAmbas); // → [ 'Paul', 'Sofía' ]

// Diferencia: SOLO en la primera → los de A que B NO tiene
const soloPrimera = [...setA].filter((e) => !setB.has(e));
console.log("Solo en Programación:", soloPrimera); // → [ 'Ana', 'Luis' ]

// Unión: todos sin repetir → juntamos ambos y el Set quita duplicados
const todos = new Set([...setA, ...setB]);
console.log("Total de estudiantes distintos:", todos.size); // → 6
console.log([...todos]); // → [ 'Ana', 'Luis', 'Paul', 'Sofía', 'Diego', 'Carla' ]

// [...setA] convierte el Set en array porque los Set NO tienen filter.
// setB.has(e) es casi instantáneo; con un array, includes() recorrería todo cada vez.
