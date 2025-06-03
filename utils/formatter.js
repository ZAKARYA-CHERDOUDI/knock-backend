// Formate une réponse JSON standard
function createResponse(success, message, data = null) {
    return { success, message, data };
  }
  
  module.exports = { createResponse };
  