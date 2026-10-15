// ============================================================
// src/utils.js — funciones auxiliares reutilizables
// ============================================================
// Varias exportaciones con nombre. Se importan con llaves: import { capitalizar } from "./utils.js"

const formatoFecha = new Intl.DateTimeFormat("es-BO", {
  day: "numeric",
  month: "short",
  year: "numeric",
}); // se crea UNA vez y se reutiliza (capítulo 4)

export function formatearFecha(fecha) {
  return formatoFecha.format(new Date(fecha)); // → "30 jun 2027"
}

export function capitalizar(texto) {
  const limpio = texto.trim();
  if (limpio === "") return limpio;
  return limpio[0].toUpperCase() + limpio.slice(1).toLowerCase();
}
