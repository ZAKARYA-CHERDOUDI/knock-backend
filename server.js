const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// Routes
const alertRoutes = require('./routes/alertes'); // ⚠️ le bon nom de fichier
app.use('/api/alertes', alertRoutes);

// Connexion Mongo 
mongoose.connect('mongodb://localhost:27017/alertesDB')
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error(err));

// Serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
