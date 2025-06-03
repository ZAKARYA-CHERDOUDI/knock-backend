const mongoose = require('mongoose');

const alerteSchema = new mongoose.Schema({
  sujet: { type: String, required: true },
  description: { type: String, required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  arrondissement: { type: String, required: true },
  type: { type: String, required: true } // Ex: "Eau", "Voirie", etc.
});

module.exports = mongoose.model('Alerte', alerteSchema);
