const webpush = require('web-push');

const publicKey = 'BJJYVRRw-B1mI6NbVXqBuZKB-i88Aipso_H-xOnrf_vyn9YCn1MCXttLLD6JUuHNJU2ywr5V7kBr_hbFhzkapSw';
const privateKey = 'iWedKd5wKW9lCQ9fs9Eka68LwLPHBDy1AzobtHjTOX0';
const contactEmail = 'mailto:lelafontant@yahoo.ca';

// Configuration des clés VAPID
webpush.setVapidDetails(contactEmail, publicKey, privateKey);

// Envoi d’une notification push
async function sendPushNotification(subscription, payload) {
  try {
    const response = await webpush.sendNotification(subscription, JSON.stringify(payload));
    console.log(` Notification envoyée à ${subscription.endpoint}`);
    return response;
  } catch (error) {
    console.error(' Erreur lors de l’envoi de la notification :', error.message);
    throw error;
  }
}

module.exports = { sendPushNotification };
