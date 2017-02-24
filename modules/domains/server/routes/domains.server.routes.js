'use strict';

/**
 * Module dependencies
 */
var domainsPolicy = require('../policies/domains.server.policy'),
  domains = require('../controllers/domains.server.controller');

module.exports = function (app) {
  // Domains collection routes
  app.route('/api/domains').all(domainsPolicy.isAllowed)
    .get(domains.list)
    .post(domains.create);

  // Single domain routes
  app.route('/api/domains/:domainId').all(domainsPolicy.isAllowed)
    .get(domains.read)
    .put(domains.update)
    .delete(domains.delete);

  // Finish by binding the domain middleware
  app.param('domainId', domains.domainByID);
};
