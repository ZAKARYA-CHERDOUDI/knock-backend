const express = require('express');
const router = express.Router();
const Alerte = require('../models/alert'); // chemin relatif CORRECT

// Créer une alerte
router.post('/', async (req, res) => {
  try {
    const nouvelleAlerte = new Alerte(req.body);
    const alerteSauvegardee = await nouvelleAlerte.save();
    res.status(201).json(alerteSauvegardee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
