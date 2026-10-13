const alumnos = [
{ nombre: "Ana", nota: 85, carrera: "Sistemas" },
{ nombre: "Luis", nota: 42, carrera: "Redes" },
{ nombre: "Paul", nota: 91, carrera: "Sistemas" },
{ nombre: "Sofía", nota: 67, carrera: "Redes" },
{ nombre: "Diego", nota: 38, carrera: "Sistemas" },
];



console.log('\n 1. Obtén un array solo con los nombres ( map ).')
const nombres = alumnos.map(alumno => alumno.nombre);
console.log('Nombres:', nombres);


console.log('\n 2. Obtén los aprobados, nota mayor o igual a 51 ( filter ).')
const aprobados = alumnos.filter(alumno => alumno.nota >= 51);
console.log('Aprobados:', aprobados);


console.log('\n 3. Obtén el promedio de las notas ( reduce ).')
const promedioNotas = alumnos.reduce((acumulador, alumno) => acumulador + alumno.nota, 0) / alumnos.length;
console.log('Promedio de notas:', promedioNotas);


console.log('\n 4. Encuentra al alumno con la nota más alta ( reduce ).')
const alumnoMejorNota = alumnos.reduce((mejor, alumno) => (alumno.nota > mejor.nota ? alumno : mejor), alumnos[0]);
console.log('Alumno con la nota más alta:', alumnoMejorNota);


console.log('\n 5. Verifica si hay algún alumno con nota mayor a 90 ( some ) y si todos aprobaron ( every ).')
const mayor_noventa = alumnos.some(alumno => alumno.nota > 90);
console.log('¿Hay algún alumno con nota mayor a 90?', mayor_noventa);

const todos_aprobados = alumnos.every(alumno => alumno.nota >= 51);
console.log('¿Todos los alumnos aprobaron?', todos_aprobados);


console.log('\n 6. Cuenta los alumnos por carrera ( reduce ).')
const alumnosxCarrera = alumnos.reduce((acumulador, alumno) => {
    if (acumulador[alumno.carrera]) {
        acumulador[alumno.carrera]++; 
    } else {
        acumulador[alumno.carrera] = 1;
    }
    return acumulador;
}, {}); 
console.log('Cantidad de alumnos por carrera:', alumnosxCarrera);


console.log('\n 7. Nombres de los aprobados de Sistemas, en mayúsculas, ordenados alfabéticamente y unidos por comas.')
const aprobadosSistemas = alumnos
    .filter(alumno => alumno.carrera === "Sistemas" && alumno.nota >= 51)
    .map(alumno => alumno.nombre.toUpperCase())
    .sort()
    .join(", ");
console.log('Aprobados de Sistemas:', aprobadosSistemas);

console.log('8. Agrega un alumno nuevo y elimina a “Luis”, sin mutar el array original.');
const nuevoAlumno = { nombre: "Carla", nota: 75, carrera: "Redes" };
const alumnosActualizados = [...alumnos, nuevoAlumno].filter(alumno => alumno.nombre !== "Luis");
console.log('Alumnos actualizados:', alumnosActualizados);

