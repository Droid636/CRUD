const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const crudRoutes = require('./routes/crud');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));

// Conexión Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error(err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/crud', crudRoutes);

// HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'registro.html'));
});


app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
  });
  
app.get('/docente.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'docente.html'));
  });
  
app.get('/alumno.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'alumno.html'));
  });
  

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
