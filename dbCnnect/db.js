const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cinemax', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch((err) => {
  console.error('Error al conectar a MongoDB:', err);
});

module.exports = DB;