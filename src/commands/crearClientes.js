import { Cliente } from "../models/Cliente.js";

try {
  const nuevoCliente = new Cliente({
    nombre: "Mateo Paternina",
    email: "mateo@mail.com",
    telefono: "3001234567",
    cedula: "1234567890",
    direccion: "Sincelejo, Sucre"
  });

  console.log("✅ Cliente creado exitosamente:");
  console.log(nuevoCliente);
} catch (error) {
  console.error("❌ Error al crear el cliente:");
  console.error(error.message);
}
