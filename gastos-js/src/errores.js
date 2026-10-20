
// src/errores.js

// Error para datos inválidos
export class ValidacionError extends Error {
  constructor(campo, mensaje) {
    super(mensaje);                 // 1. el padre (Error) guarda el mensaje
    this.name = "ValidacionError";  // 2. el nombre del tipo de error
    this.campo = campo;             // 3. dato extra propio
  }
}

// Error para cuando un gasto supera el presupuesto
export class PresupuestoExcedidoError extends Error{
    constructor(limite, totalConGasto) {
        super(`El gasto supera el presupuesto del mes por ${totalConGasto - limite}`);
        this.name = "PresupuestoExcedidoError";
        this.limite = limite;
        this.totalConGasto = totalConGasto;
        this.exceso = totalConGasto - limite; // 4. calculado en el constructor
  }
}

