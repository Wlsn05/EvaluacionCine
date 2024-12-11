const mongoose = require('mongoose');

const sillaSchema = new mongoose.Schema({
  numero: Number,
  estado: {
    type: String,
    enum: ['disponible', 'reservada', 'ocupada'],
    default: 'disponible',
  },
  salaId: Number,
});

const Silla = mongoose.model('Silla', sillaSchema);

module.exports = Silla;
