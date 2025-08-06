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
import { ObjectId } from 'mongodb';

/**
 * Modelo de datos para una Propuesta
 * @param {Object} datos - Datos de la propuesta
 * @returns {Object} Objeto de propuesta validado
 */
export function crearPropuesta(datos) {
  const errores = [];

  // Validación: título obligatorio y mínimo 3 caracteres
  if (!datos.titulo || typeof datos.titulo !== 'string' || datos.titulo.trim().length < 3) {
    errores.push('El título es obligatorio y debe tener al menos 3 caracteres.');
  }

  // Validación: descripción obligatoria y mínima 10 caracteres
  if (!datos.descripcion || typeof datos.descripcion !== 'string' || datos.descripcion.trim().length < 10) {
    errores.push('La descripción es obligatoria y debe tener al menos 10 caracteres.');
  }

  // Validación: fecha en formato válido
  const fecha = new Date(datos.fecha);
  if (isNaN(fecha.getTime())) {
    errores.push('La fecha es inválida o está vacía.');
  }

  // Validación: cliente relacionado válido
  if (!datos.idCliente || !ObjectId.isValid(datos.idCliente)) {
    errores.push('Debe especificar un ID de cliente válido.');
  }

  if (errores.length > 0) {
    throw new Error(errores.join(' '));
  }

  return {
    titulo: datos.titulo.trim(),
    descripcion: datos.descripcion.trim(),
    fecha: fecha,
    idCliente: new ObjectId(datos.idCliente),
  };
}
