const express = require('express');
const router = express.Router();
const { sendPushNotification } = require('../utils/push-service');
const Alerte = require('../models/alerte'); // ✅ ajouter le modèle Mongoose ici

// Stock temporaire pour les abonnements
const subscriptions = [];

// ✅ Route POST pour créer une alerte
router.post('/alertes', async (req, res) => {
  try {
    const nouvelleAlerte = new Alerte(req.body);
    const alerteSauvegardee = await nouvelleAlerte.save();
    res.status(201).json(alerteSauvegardee);
  } catch (error) {
    console.error("Erreur alerte :", error.message);
    res.status(400).json({ message: error.message });
  }
});

// Route pour s’abonner
router.post('/subscribe', (req, res) => {
  const subscription = req.body;
  const exists = subscriptions.find(sub => sub.endpoint === subscription.endpoint);

  if (!exists) {
    subscriptions.push(subscription);
    console.log(' Abonnement reçu.');
    res.status(201).json({ message: 'Abonnement enregistré' });
  } else {
    console.log(' Abonnement déjà existant.');
    res.status(200).json({ message: 'Déjà abonné' });
  }
});

// Route pour envoyer une notification
router.post('/send-notification', async (req, res) => {
  const { title, body } = req.body;
  const payload = { title, body };

  await Promise.allSettled(
    subscriptions.map(sub => sendPushNotification(sub, payload))
  );

  res.status(200).json({ message: 'Notifications envoyées' });
});

module.exports = router;
