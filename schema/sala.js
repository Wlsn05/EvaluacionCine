const mongoose = require('mongoose');

const salaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  capacidad: { type: Number, required: true },
  descripcion: String,
});

const Sala = mongoose.model('Sala', salaSchema);

module.exports = Sala;