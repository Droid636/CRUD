const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema({
  idAlumno: String,
  nombre: String,
  apellidos: String,
  matricula: String,
  edad: Number,
  celular: String,
  curp: String,
  usuario: { type: String, unique: true },  // Asegúrate de que sea único si es necesario
  contrasena: { type: String, required: true }  // Asegúrate de que este campo esté definido correctamente
});

const Alumno = mongoose.model('Alumno', alumnoSchema);

module.exports = Alumno;
