// src/utils.js

// 1. El formateador se crea UNA sola vez, fuera de las funciones
const formatoBs = new Intl.NumberFormat('es-BO', {style: 'currency', currency:'BOB'});

// 2. Formatear dinero
export function formatearBs(monto){
    return formatoBs.format(monto);
}

//3. Formatear fecha
export function formatearFecha(fecha){
    return fecha.toLocaleDateString('es-BO');
}



