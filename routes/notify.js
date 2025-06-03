const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const webpush = require('web-push');
const { createResponse } = require('../utils/formatter');

// Clés VAPID à générer avec web-push (mettre dans .env pour production)
const publicKey = 'TA_CLE_PUBLIQUE';
const privateKey = 'TA_CLE_PRIVEE';
webpush.setVapidDetails('mailto:exemple@email.com', publicKey, privateKey);

// POST /send-notification : Envoie une notification à tous les abonnés
router.post('/send-notification', async (req, res) => {
  const { title, body } = req.body;

  try {
    const subscriptions = await Subscription.find();

    const notifications = subscriptions.map(sub =>
      webpush.sendNotification(sub, JSON.stringify({ title, body }))
    );

    await Promise.allSettled(notifications);

    res.json(createResponse(true, 'Notifications envoyées'));
  } catch (err) {
    res.status(500).json(createResponse(false, 'Erreur d\'envoi', err.message));
  }
});

module.exports = router;
