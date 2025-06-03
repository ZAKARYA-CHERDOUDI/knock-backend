const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const { createResponse } = require('../utils/formatter');

// POST /subscribe : Enregistre un abonnement
router.post('/subscribe', async (req, res) => {
  try {
    const subscription = new Subscription(req.body);
    await subscription.save();
    res.status(201).json(createResponse(true, 'Abonnement enregistré'));
  } catch (err) {
    res.status(500).json(createResponse(false, 'Erreur d\'enregistrement', err.message));
  }
});

// POST /unsubscribe : Supprime un abonnement
router.post('/unsubscribe', async (req, res) => {
  try {
    const { endpoint } = req.body;
    await Subscription.findOneAndDelete({ endpoint });
    res.json(createResponse(true, 'Abonnement supprimé'));
  } catch (err) {
    res.status(500).json(createResponse(false, 'Erreur de désabonnement', err.message));
  }
});

module.exports = router;
