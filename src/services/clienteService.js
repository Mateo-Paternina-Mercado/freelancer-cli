import { MongoClient } from "mongodb";
import { Cliente } from "../models/Cliente.js";
import { MONGO_URI } from "../config/db.js";

const DB_NAME = "freelancerDB";
const COLLECTION = "clientes";

async function conectar() {
  const cliente = new MongoClient(MONGO_URI);
  await cliente.connect();
  const db = cliente.db(DB_NAME);
  return { db, cliente };
}

// Crear un nuevo cliente
export async function crearCliente(datos) {
  const { db, cliente } = await conectar();
  try {
    const nuevo = new Cliente(datos);
    const resultado = await db.collection(COLLECTION).insertOne(nuevo);
    return resultado;
  } finally {
    await cliente.close();
  }
}

// Obtener todos los clientes
export async function obtenerClientes() {
  const { db, cliente } = await conectar();
  try {
    return await db.collection(COLLECTION).find().toArray();
  } finally {
    await cliente.close();
  }
}

// Buscar cliente por cédula
export async function buscarClientePorCedula(cedula) {
  const { db, cliente } = await conectar();
  try {
    return await db.collection(COLLECTION).findOne({ cedula });
  } finally {
    await cliente.close();
  }
}

// Actualizar cliente por cédula
export async function actualizarCliente(cedula, nuevosDatos) {
  const { db, cliente } = await conectar();
  try {
    const actualizado = new Cliente({ ...nuevosDatos, cedula }); // revalida todo
    return await db.collection(COLLECTION).updateOne(
      { cedula },
      { $set: actualizado }
    );
  } finally {
    await cliente.close();
  }
}

// Eliminar cliente por cédula
export async function eliminarCliente(cedula) {
  const { db, cliente } = await conectar();
  try {
    return await db.collection(COLLECTION).deleteOne({ cedula });
  } finally {
    await cliente.close();
  }
}
