import inquirer from 'inquirer';
import { crearPropuesta, listarPropuestas, eliminarPropuesta } from '../services/propuestaService.js';

export async function mostrarMenuPropuestas() {
  let salir = false;

  while (!salir) {
    const { opcion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '📄 Menú de Propuestas',
        choices: [
          '📨 Crear propuesta',
          '📋 Listar propuestas',
          '❌ Eliminar propuesta',
          '⬅️ Volver al menú principal',
        ],
      },
    ]);

    switch (opcion) {
      case '📨 Crear propuesta':
        await crearPropuesta();
        break;
      case '📋 Listar propuestas':
        await listarPropuestas();
        break;
      case '❌ Eliminar propuesta':
        await eliminarPropuesta();
        break;
      case '⬅️ Volver al menú principal':
        salir = true;
        break;
    }
  }
}
