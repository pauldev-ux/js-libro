/*
P R Á CT I CA
En 13-fechas-regex.js :
1. Escribe diasHasta(fechaTexto) que devuelva cuántos días faltan para una fecha, por ejemplo
tu próximo parcial.
2. Escribe edad(fechaNacimiento) que calcule la edad exacta en años.
3. Muestra la fecha de hoy en tres formatos distintos usando toLocaleDateString con opciones.
4. Usa Intl.RelativeTimeFormat para imprimir “hace 2 horas”, “en 5 días” y “ayer”.
5. Escribe validarRegistro({ email, celular, password }) que use regex y devuelva un objeto
con los campos inválidos.
6. Extrae todos los hashtags de "Aprendiendo #JavaScript y #NodeJS para ser #FullStack" 

*/



// ============================================================
// Capítulo 13 · Práctica: fechas y expresiones regulares
// ============================================================

const MS_POR_DIA = 24 * 60 * 60 * 1000; // 86 400 000 milisegundos en un día

// ------------------------------------------------------------
// 1. diasHasta: cuántos días faltan para una fecha
// ------------------------------------------------------------
console.log("=== 1. diasHasta ===");

function diasHasta(fechaTexto) {
  // "T00:00:00" hace que se interprete como medianoche HORA LOCAL.
  // Sin eso, "2026-11-20" se lee como medianoche UTC, que en Bolivia (UTC-4)
  // es el día ANTERIOR a las 20:00 → la cuenta saldría con un día de error.
  const objetivo = new Date(`${fechaTexto}T00:00:00`);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // comparamos días completos, sin importar la hora actual

  // Restar dos fechas da la diferencia en MILISEGUNDOS → la dividimos entre los ms de un día
  return Math.round((objetivo - hoy) / MS_POR_DIA);
  // Math.round y no Math.floor: absorbe la hora de diferencia de los cambios de horario
}

const parcial = "2026-11-20"; // cambia esta fecha por la de tu próximo parcial
const dias = diasHasta(parcial);
if (dias > 0) console.log(`Faltan ${dias} días para el parcial`);
else if (dias === 0) console.log("¡El parcial es hoy!");
else console.log(`El parcial fue hace ${-dias} días`);

// ------------------------------------------------------------
// 2. edad: años cumplidos exactos
// ------------------------------------------------------------
console.log("\n=== 2. edad ===");

function edad(fechaNacimiento) {
  const nacimiento = new Date(`${fechaNacimiento}T00:00:00`);
  const hoy = new Date();

  let anios = hoy.getFullYear() - nacimiento.getFullYear(); // primera aproximación

  // ¿Ya pasó el cumpleaños de ESTE año? Si todavía no llegó, restamos 1
  const yaCumplio =
    hoy.getMonth() > nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() >= nacimiento.getDate());

  if (!yaCumplio) anios--;
  return anios;
}

// Restar solo los años falla: alguien nacido el 20 de diciembre de 2000
// tiene 25 años durante casi todo 2026, aunque 2026 - 2000 = 26
console.log(edad("2000-12-20")); // → 25 en octubre de 2026 (aún no cumplió)
console.log(edad("2000-01-10")); // → 26 (ya cumplió en enero)

// ------------------------------------------------------------
// 3. La fecha de hoy en tres formatos
// ------------------------------------------------------------
console.log("\n=== 3. Formatos de fecha ===");

const hoy = new Date();

console.log(hoy.toLocaleDateString("es-BO"));
// → 14/10/2026                              (corto)

console.log(hoy.toLocaleDateString("es-BO", { day: "numeric", month: "long", year: "numeric" }));
// → 14 de octubre de 2026                   (largo)

console.log(hoy.toLocaleDateString("es-BO", { weekday: "long", day: "numeric", month: "long" }));
// → miércoles, 14 de octubre                (con día de la semana)

// Bonus: el formato para guardar o enviar a una API
console.log(hoy.toISOString()); // → 2026-10-15T01:15:00.000Z (siempre en UTC)

// ------------------------------------------------------------
// 4. Tiempo relativo con Intl.RelativeTimeFormat
// ------------------------------------------------------------
console.log("\n=== 4. Tiempo relativo ===");

// numeric: "auto" permite palabras como "ayer" o "mañana" en lugar de "hace 1 día"
const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

console.log(rtf.format(-2, "hour")); // → hace 2 horas  (número negativo = pasado)
console.log(rtf.format(5, "day"));   // → dentro de 5 días  (positivo = futuro)
// El ejercicio pedía "en 5 días": Intl usa "dentro de" en español, que significa lo mismo
console.log(rtf.format(-1, "day"));  // → ayer

// Con numeric: "always" (el valor por defecto) no usa palabras especiales
const rtfSiempre = new Intl.RelativeTimeFormat("es");
console.log(rtfSiempre.format(-1, "day")); // → hace 1 día

// ------------------------------------------------------------
// 5. Validar un registro con expresiones regulares
// ------------------------------------------------------------
console.log("\n=== 5. validarRegistro ===");

const REGLAS = {
  // algo sin espacios ni @, una @, algo, un punto y algo más. Ej: paul@correo.com
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  // celular boliviano: empieza en 6 o 7 y tiene 8 dígitos en total
  celular: /^[67]\d{7}$/,
  // al menos 8 caracteres, con al menos una mayúscula y un número
  // (?=.*[A-Z]) = "más adelante hay una mayúscula"; (?=.*\d) = "más adelante hay un dígito"
  password: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
};

const MENSAJES = {
  email: "Email inválido",
  celular: "El celular debe tener 8 dígitos y empezar en 6 o 7",
  password: "Mínimo 8 caracteres, con una mayúscula y un número",
};

function validarRegistro({ email, celular, password }) {
  const datos = { email, celular, password };
  const errores = {};

  for (const [campo, regla] of Object.entries(REGLAS)) {
    // test() devuelve true si el texto cumple el patrón
    // ?? "" evita un error si el campo viene undefined
    if (!regla.test(datos[campo] ?? "")) {
      errores[campo] = MENSAJES[campo];
    }
  }
  return errores; // objeto vacío {} = todo válido
}

console.log(validarRegistro({ email: "paul@correo.com", celular: "71234567", password: "Segura123" }));
// → {}   todo válido

console.log(validarRegistro({ email: "paul.correo.com", celular: "5123", password: "corta" }));
// → { email: '...', celular: '...', password: '...' }

const errores = validarRegistro({ email: "paul@correo.com", celular: "81234567", password: "sinnumeros" });
console.log(Object.keys(errores).length === 0 ? "Registro válido" : errores);
// → { celular: '...', password: '...' }

// ------------------------------------------------------------
// 6. Extraer hashtags
// ------------------------------------------------------------
console.log("\n=== 6. Hashtags ===");

const texto = "Aprendiendo #JavaScript y #NodeJS para ser #FullStack";

// # seguido de UNO O MÁS caracteres de palabra (\w+). La flag g busca TODAS las coincidencias
const hashtags = texto.match(/#\w+/g);
console.log(hashtags); // → [ '#JavaScript', '#NodeJS', '#FullStack' ]

// Sin el #: quitarlo con map
console.log(hashtags.map((h) => h.slice(1))); // → [ 'JavaScript', 'NodeJS', 'FullStack' ]

// Cuidado: si no hay coincidencias, match devuelve null (no un array vacío)
console.log("Sin hashtags aquí".match(/#\w+/g));         // → null
console.log("Sin hashtags aquí".match(/#\w+/g) ?? []);   // → []  (más seguro para recorrerlo después)

// \w no incluye letras con tilde ni la ñ: #Programación se cortaría en "#Programaci"
console.log("#Programación".match(/#\w+/g));              // → [ '#Programaci' ]
console.log("#Programación".match(/#[\p{L}\d_]+/gu));     // → [ '#Programación' ]  (\p{L} = cualquier letra, requiere la flag u)