const mongoose = require('mongoose');

// Schéma pour stocker un abonnement push
const SubscriptionSchema = new mongoose.Schema({
  endpoint: { type: String, required: true },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true }
  }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
