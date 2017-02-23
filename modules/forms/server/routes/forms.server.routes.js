'use strict';

/**
 * Module dependencies
 */
var formsPolicy = require('../policies/forms.server.policy'),
  forms = require('../controllers/forms.server.controller');

module.exports = function (app) {
  // Forms collection routes
  app.route('/api/forms').all(formsPolicy.isAllowed)
    .get(forms.list)
    .post(forms.create);

  // Single form routes
  app.route('/api/forms/:formId').all(formsPolicy.isAllowed)
    .get(forms.read)
    .put(forms.update)
    .delete(forms.delete);

  // Finish by binding the form middleware
  app.param('formId', forms.formByID);
};
