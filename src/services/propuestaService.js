import { conectarDB } from '../config/db.js';
import inquirer from 'inquirer';

export async function crearPropuesta() {
  const db = await conectarDB();
  const clientes = await db.collection('clientes').find().toArray();

  if (clientes.length === 0) {
    console.log('⚠️ No hay clientes registrados.');
    return;
  }

  const { clienteSeleccionado } = await inquirer.prompt([
    {
      type: 'list',
      name: 'clienteSeleccionado',
      message: 'Selecciona un cliente:',
      choices: clientes.map(c => ({
        name: `${c.nombre} (${c.cedula})`,
        value: c._id,
      })),
    },
  ]);

  const { titulo, descripcion, presupuesto, aceptada} = await inquirer.prompt([
    { name: 'titulo', message: 'Título de la propuesta:' },
    { name: 'descripcion', message: 'Descripción de la propuesta:' },
    { name: 'presupuesto', message: 'Presupuesto estimado:', validate: v => !isNaN(v) || 'Debe ser numérico' },
    { name: 'aceptada', message: 'propuesta aceptada sin proyecto:', validate: v => !FileList(v) ||  'Esto es una lista'},

  ]);

  await db.collection('propuestas').insertOne({
    clienteId: clienteSeleccionado,
    titulo,
    descripcion,
    presupuesto: parseFloat(presupuesto),
    aceptada,
    fechaCreacion: new Date(),
  });

  console.log('✅ Propuesta creada exitosamente.');
}

export async function listarPropuestas() {
  const db = await conectarDB();
  const propuestas = await db.collection('propuestas').find().toArray();

  if (propuestas.length === 0) {
    console.log('📭 No hay propuestas registradas.');
    return;
  }

  propuestas.forEach(p => {
    console.log(`\n📝 ${p.titulo} (${p.presupuesto} COP)`);
    console.log(`🧾 ${p.descripcion}`);
    console.log(`📅 Creada: ${p.fechaCreacion.toLocaleDateString()}`);
  });
}

export async function eliminarPropuesta() {
  const db = await conectarDB();
  const propuestas = await db.collection('propuestas').find().toArray();

  if (propuestas.length === 0) {
    console.log('⚠️ No hay propuestas para eliminar.');
    return;
  }

  const { propuestaId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'propuestaId',
      message: 'Selecciona una propuesta para eliminar:',
      choices: propuestas.map(p => ({
        name: `${p.titulo} (${p.presupuesto} COP)`,
        value: p._id,
      })),
    },
  ]);

  await db.collection('propuestas').deleteOne({ _id: propuestaId });
  console.log('🗑️ Propuesta eliminada.');
}
