export class Propuesta {
  constructor({ titulo, descripcion, clienteCedula, fechaEntrega, valor }) {
    if (!titulo || !descripcion || !clienteCedula || !fechaEntrega || !valor) {
      throw new Error("Todos los campos son obligatorios");
    }
    if (typeof valor !== "number" || valor <= 0) {
      throw new Error("El valor debe ser un número positivo");
    }

    this.titulo = titulo;
    this.descripcion = descripcion;
    this.clienteCedula = clienteCedula;
    this.fechaEntrega = new Date(fechaEntrega);
    this.valor = valor;
    this.estado = "pendiente"; // Estados: pendiente, aceptada, rechazada
  }
}
