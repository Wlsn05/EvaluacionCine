const express = require('express');
const mongoose = require('mongoose');
const Silla = require('./schema/silla');
const Sala = require('./schema/sala');

const app = express();
const port = 3000;



app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Configuración de la base de datos
mongoose.connect('mongodb://localhost:27017/cinemax', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch((err) => {
  console.error('Error al conectar a MongoDB:', err);
});

// Middleware para manejar JSON
app.use(express.json());

app.post('/sala', async (req, res) => {
  const { nombre, capacidad, descripcion } = req.body;
  try {
    const nuevaSala = new Sala({ nombre, capacidad, descripcion });
    await nuevaSala.save();
    res.status(201).send(`Sala "${nombre}" creada con éxito.`);
  } catch (err) {
    res.status(500).send('Error al crear la sala');
  }
});
// Crear una sala y sus sillas
app.post('/sala', async (req, res) => {
  const { nombre, capacidad, descripcion } = req.body;
  try {
    const nuevaSala = new Sala({ nombre, capacidad, descripcion });
    const salaCreada = await nuevaSala.save();

    // Crear sillas para la sala
    const sillas = Array.from({ length: capacidad }, (_, i) => ({
      numero: i + 1,
      estado: 'disponible',
      salaId: salaCreada._id,
    }));
    await Silla.insertMany(sillas);

    res.status(201).send(`Sala "${nombre}" creada con ${capacidad} sillas.`);
  } catch (err) {
    res.status(500).send('Error al crear la sala y las sillas');
  }
});
//obtener salas
app.get('/salas', async (req, res) => {
  try {
    const salas = await Sala.find();
    //res.json(salas);
    res.render('sala', { salas })
  } catch (err) {
    res.status(500).send('Error al obtener las salas');
  }
});

app.get('/sala/:salaId', async (req, res) => {
  const { salaId } = req.params;
  try {
    const sillas = await Silla.find({ salaId });
    res.render('sala', { sillas });
  } catch (err) {
    res.status(500).send('Error al cargar la sala');
  }
});

app.post('/reservar', async (req, res) => {
  const { sillaId } = req.body;
  try {
    const silla = await Silla.findById(sillaId);
    if (silla.estado === 'disponible') {
      silla.estado = 'reservada';
      await silla.save();
      res.send('Silla reservada exitosamente');
    } else {
      res.status(400).send('La silla no está disponible');
    }
  } catch (err) {
    res.status(500).send('Error al reservar la silla');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});