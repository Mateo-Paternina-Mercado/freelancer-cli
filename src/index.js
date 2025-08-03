import { conectarDB } from './config/db.js';

const main = async () => {
  const db = await conectarDB();
  const colecciones = await db.listCollections().toArray();
  console.log('📂 Colecciones disponibles:', colecciones);
};

main();
