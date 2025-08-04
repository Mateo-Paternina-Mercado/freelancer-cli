export class Cliente {
  constructor({ nombre, email, telefono, cedula, direccion }) {
    this.validarNombre(nombre);
    this.validarEmail(email);
    this.validarTelefono(telefono);
    this.validarCedula(cedula);
    this.validarDireccion(direccion);

    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.cedula = cedula;
    this.direccion = direccion;
    this.fechaRegistro = new Date();
  }

  validarNombre(nombre) {
    if (typeof nombre !== "string" || nombre.trim() === "") {
      throw new Error("El nombre es obligatorio y debe ser una cadena.");
    }
  }

  validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      throw new Error("El email no tiene un formato válido.");
    }
  }

  validarTelefono(telefono) {
    if (!/^\d{7,15}$/.test(telefono)) {
      throw new Error("El teléfono debe tener entre 7 y 15 dígitos.");
    }
  }

  validarCedula(cedula) {
    if (!/^\d{6,15}$/.test(cedula)) {
      throw new Error("La cédula debe ser numérica y válida.");
    }
  }

  validarDireccion(direccion) {
    if (typeof direccion !== "string" || direccion.trim() === "") {
      throw new Error("La dirección es obligatoria.");
    }
  }
}
