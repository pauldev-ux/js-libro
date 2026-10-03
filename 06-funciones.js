console.log("\n=== 6. Funciones ===");



console.log("\n=== 1. Area de un círculo en 3 funciones ===");
function areaCirculo(radio) {
    return (Math.PI * Math.pow(radio, 2)).toFixed(2); // redondea a 2 decimales
}

function areaCirculo2(radio) {
    return (Math.PI * (radio * radio)).toFixed(2); 
}

function areaCirculo3(radio) {
    const area = Math.PI * radio ** 2;
    return area.toFixed(2); // redondea a 2 decimales
}

console.log(areaCirculo(3));  // → 28.27
console.log(areaCirculo2(3)); // → 28.27
console.log(areaCirculo3(3)); // → 28.27   




// ------------------------------------------------------------
// 2. promedio con parámetros rest
// ------------------------------------------------------------
console.log("\n=== 2. Promedio de notas ===");
function promedio(...notas) {
    let suma = 0;
    for (const nota of notas) {
        suma += nota;
    }
    return (suma / notas.length).toFixed(2);  // redondea a 2 decimales
}

console.log(promedio(71.545, 60.45, 90.75)); // → 74.25




// ------------------------------------------------------------
// 3. Parámetro por defecto
// ------------------------------------------------------------
console.log("\n === 3. Descuento con valor por defecto ===");
function aplicarDescuento(precio, porcentaje = 10) { // valor por defecto de porcentaje = 10
    return precio - (precio * porcentaje / 100);
}

console.log(aplicarDescuento(50));      // → 45
console.log(aplicarDescuento(50, 20));  // → 40    



// ------------------------------------------------------------
// 4. Callback
// ------------------------------------------------------------
console.log("=== 4. Repetir acción ===");
function repetir(n, accion) {
    for (let i = 0; i < n; i++) {
        accion(i);
    }
}
console.log(repetir(3, console.log)); // → 0 1 2
repetir(3, (i) => console.log(i)); // → 0 1 2



// ------------------------------------------------------------
// 5. Closure: banco con saldo privado
// ------------------------------------------------------------
console.log("\n=== 5. Banco con saldo privado ===");
function crearBanco(saldoInicial) {
   let saldo = saldoInicial; // variable privada
   return {
        depositar: (monto) => {
            if (monto <= 0) {
                console.log("Monto inválido");
                return;             
            }
            saldo += monto;
            console.log(`Depósito de Bs ${monto} realizado. Nuevo saldo: Bs ${saldo}`);
        },
        retirar: (monto) => {
            if (monto <= 0) {
                console.log("Monto inválido");
                return;             
            }
            if (monto > saldo) {
                console.log("Saldo insuficiente");
                return;
            }
            saldo -= monto;
            console.log(`Retiro de Bs ${monto} realizado. Nuevo saldo: Bs ${saldo}`);
        },
        consultarSaldo: () => {
            return saldo;
        }

    } 
}



const cuenta = crearBanco(100); // saldo inicial 100
cuenta.depositar(50);            // → Depositado: 50. Saldo: 150
cuenta.retirar(500);             // → Saldo insuficiente...
cuenta.retirar(30);              // → Retirado: 30. Saldo: 120
console.log(cuenta.consultarSaldo());  // → 120
 
console.log(cuenta.saldo);       // → undefined: saldo no es una propiedad del objeto
cuenta.saldo = 1000000;          // esto crea una propiedad NUEVA llamada saldo...
console.log(cuenta.consultarSaldo());  // → 120   ...pero el saldo real no cambió
 
const otraCuenta = crearBanco(10); // cada llamada crea su propio saldo independiente
console.log(otraCuenta.consultarSaldo()); // → 10



// ------------------------------------------------------------
// 6. this y bind
// ------------------------------------------------------------
console.log("\n=== 6. this ===");

const perro = {
    nombre: "Fido",
    ladrar: function() {
        console.log(`${this.nombre} dice: ¡Guau!`);
    }
}

//esto dara error porque this no apunta a perro, sino al contexto global (window en navegadores, global en Node.js)
//perro.ladrar(); // → Fido dice: ¡Guau!

const ladrarSuelto = perro.ladrar; // asignamos la función a una variable
try {
    ladrarSuelto(); // → undefined dice: ¡Guau!  (this no apunta a perro)
}catch (error) {   
    console.log(`${error.name}: ${error.message}`); // TypeError: Cannot read property 'nombre' of undefined
}

const ladrarConBind = perro.ladrar.bind(perro); // bind "fija" this a perro
ladrarConBind(); // → Fido dice: ¡Guau!




// ------------------------------------------------------------
// 7. Recursión: fibonacci
// ------------------------------------------------------------

console.log("\n 7. Fibonacci recursivo ===");
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const serieFibonacci = [];
for (let i = 0; i < 10; i++) { //imprime los primeros 10 números de la serie de Fibonacci
    serieFibonacci.push(fibonacci(i));
}


//console.log(fibonacci(10)); // → 55
console.log(serieFibonacci); // → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
