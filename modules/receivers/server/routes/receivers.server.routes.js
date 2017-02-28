'use strict';

/**
 * Module dependencies
 */
var receiversPolicy = require('../policies/receivers.server.policy'),
  receivers = require('../controllers/receivers.server.controller');

module.exports = function (app) {
  // Receivers collection routes
  app.route('/api/receivers').all(receiversPolicy.isAllowed)
    .get(receivers.list)
    .post(receivers.create);

  // Single receiver routes
  app.route('/api/receivers/:receiverId').all(receiversPolicy.isAllowed)
    .get(receivers.read)
    .put(receivers.update)
    .delete(receivers.delete);

  // Finish by binding the receiver middleware
  app.param('receiverId', receivers.receiverByID);
};
