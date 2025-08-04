import 'dotenv/config.js';
import { conectarDB } from './config/db.js';
import { mostrarMenuPropuestas } from './commands/propuestasMenu.js';

async function main() {
  try {
    await conectarDB();
    await mostrarMenuPropuestas();
  } catch (error) {
    console.error('❌ Error al iniciar la aplicación:', error.message);
  }
}

main();
