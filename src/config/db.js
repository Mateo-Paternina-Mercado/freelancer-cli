import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const conectarDB = async () => {
  try {
    await client.connect();
    console.log('✅ Conexión exitosa a MongoDB');
    return client.db(); // devolver base de datos para ser usada en otros módulos
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error);
    process.exit(1);
  }
};

export const getClient = () => client;
