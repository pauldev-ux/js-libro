/*
P R Á CT I CA
En 11-errores.js :
1. Provoca a propósito un ReferenceError , un TypeError , un SyntaxError (con JSON.parse )
y un RangeError . Atrapa cada uno e imprime name y message .
2. Escribe parsearEdad(texto) que lance un error si el texto no es un número entero entre 0 y 120.
3. Crea la clase SaldoInsuficienteError y úsala en la CuentaBancaria del capítulo 10. Al
atraparla, muestra cuánto faltaba.
4. Escribe una función que use finally para imprimir “operación terminada” siempre, y pruébala
con y sin error.
5. Convierte un error de JSON.parse en uno propio más claro usando { cause } , e imprime
ambos mensajes.
*/

// ------------------------------------------------------------
// 1. Provocar y atrapar los 4 tipos de error
// ------------------------------------------------------------
console.log("=== 1. Tipos de error ===");

// Función auxiliar para no repetir el mismo console.log en cada catch
function mostrarError(error) {
  console.log(`${error.name}: ${error.message}`);
}
 
// ReferenceError: usar una variable que NO existe
try {
  console.log(variableQueNoExiste);
} catch (error) {
  mostrarError(error); // → ReferenceError: variableQueNoExiste is not defined
}
 
// TypeError: hacer algo que ese TIPO de valor no permite (leer una propiedad de null)
try {
  const usuario = null;
  console.log(usuario.nombre);
} catch (error) {
  mostrarError(error); // → TypeError: Cannot read properties of null (reading 'nombre')
}
 
// SyntaxError: JSON.parse recibe un texto que no es JSON válido
// (las claves deben ir con comillas dobles)
try {
  JSON.parse("{ nombre: 'Paul' }");
} catch (error) {
  mostrarError(error); // → SyntaxError: Expected property name or '}' in JSON...
}
 
// RangeError: un número fuera del rango permitido (un array no puede tener largo negativo)
try {
  new Array(-1);
} catch (error) {
  mostrarError(error); // → RangeError: Invalid array length
}
 



// ------------------------------------------------------------
// 2. Lanzar errores propios con throw
// ------------------------------------------------------------
console.log("\n=== 2. parsearEdad ===");

function parsearEdad(texto) {
  const edad = Number(texto); // Number es estricto: "25abc" da NaN (capítulo 4)
 
  // Guardas: cada una LANZA un error en vez de devolver null o un mensaje
  if (texto.trim() === "" || Number.isNaN(edad)) {
    throw new Error(`"${texto}" no es un número`);
  }
  if (!Number.isInteger(edad)) {
    throw new Error(`${edad} no es un número entero`);
  }
  if (edad < 0 || edad > 120) {
    throw new RangeError(`${edad} está fuera del rango 0–120`); // RangeError encaja con el caso
  }
  return edad; // solo llega aquí si pasó todas las guardas
}
 
// Probamos varios valores. Cada uno en su propio try, para que un error no detenga a los demás
for (const entrada of ["25", " 40 ", "abc", "", "17.5", "150", "-3"]) {
  try {
    console.log(`"${entrada}" → ${parsearEdad(entrada)}`);
  } catch (error) {
    console.log(`"${entrada}" → ✘ ${error.name}: ${error.message}`);
  }
}




// ------------------------------------------------------------
// 3. Error personalizado en la CuentaBancaria
// ------------------------------------------------------------
console.log("\n=== 3. SaldoInsuficienteError ===");
 
// Un error propio = una clase que HEREDA de Error (capítulo 10 + capítulo 11)
class SaldoInsuficienteError extends Error {
  constructor(saldo, monto) {
    super(`Saldo insuficiente: tienes ${saldo} y quieres retirar ${monto}`); // el mensaje
    this.name = "SaldoInsuficienteError"; // así aparece el tipo en los mensajes
    this.saldo = saldo;                    // datos extra que el catch puede usar
    this.monto = monto;
    this.faltante = monto - saldo;
  }
}
 
class CuentaBancaria {
  #saldo = 0;
 
  constructor(titular, saldoInicial) {
    this.titular = titular;
    this.#saldo = saldoInicial;
  }
 
  retirar(monto) {
    if (monto <= 0) throw new RangeError("El monto debe ser positivo");
    if (monto > this.#saldo) throw new SaldoInsuficienteError(this.#saldo, monto);
    this.#saldo -= monto;
    return this.#saldo;
  }
 
  get saldo() {
    return this.#saldo;
  }
}
 
const cuenta = new CuentaBancaria("Paul", 500);
 
for (const monto of [200, 800, -5]) {
  try {
    const restante = cuenta.retirar(monto);
    console.log(`Retiré ${monto}. Queda ${restante}`);
  } catch (error) {
    // instanceof distingue QUÉ error fue, para reaccionar distinto a cada uno
    if (error instanceof SaldoInsuficienteError) {
      console.log(`✘ ${error.message}. Te faltan ${error.faltante}`);
    } else if (error instanceof RangeError) {
      console.log(`✘ Monto inválido: ${error.message}`);
    } else {
      throw error; // un error que no sé manejar: lo relanzo, NO lo escondo
    }
  }
}
// → Retiré 200. Queda 300
// → ✘ Saldo insuficiente: tienes 300 y quieres retirar 800. Te faltan 500
// → ✘ Monto inválido: El monto debe ser positivo
 
// ------------------------------------------------------------
// 4. finally: se ejecuta SIEMPRE
// ------------------------------------------------------------
console.log("\n=== 4. finally ===");
 
function procesar(datos) {
  console.log(`Procesando ${JSON.stringify(datos)}...`);
  try {
    if (!datos) throw new Error("No hay datos");
    console.log("✔ Procesado correctamente");
  } catch (error) {
    console.log(`✘ Falló: ${error.message}`);
  } finally {
    // Haya error o no, esto se ejecuta: ideal para "limpiar"
    // (cerrar conexiones, ocultar un "Cargando...", liberar recursos)
    console.log("operación terminada");
  }
}
 
procesar({ id: 1 }); // sin error  → try → finally
procesar(null);      // con error  → try → catch → finally
 
// ------------------------------------------------------------
// 5. Envolver un error técnico en uno claro con { cause }
// ------------------------------------------------------------
console.log("\n=== 5. cause ===");
 
function leerConfiguracion(texto) {
  try {
    return JSON.parse(texto);
  } catch (error) {
    // Lanzamos un error ENTENDIBLE, pero guardamos el original en "cause"
    // para no perder el detalle técnico al depurar
    throw new Error("El archivo de configuración está dañado", { cause: error });
  }
}
 
try {
  leerConfiguracion("{ tema: oscuro }");
} catch (error) {
  console.log("Mensaje claro:   ", error.message);
  console.log("Causa original:  ", `${error.cause.name}: ${error.cause.message}`);
}
// → Mensaje claro:    El archivo de configuración está dañado
// → Causa original:   SyntaxError: Expected property name or '}' in JSON...





