const nombre = "Paul"; 
console.log(`Hola, ${nombre}!. Bienvenido a JS`);

const usuario = [
    {nombre: "Paul", edad: 25},
    {nombre: "Maria", edad: 30}
]

console.table(usuario);


console.time('bucle');
for (let i = 0; i < 1000000; i++) {}
console.timeEnd('bucle');
