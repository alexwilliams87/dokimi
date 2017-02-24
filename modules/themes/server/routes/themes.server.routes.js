'use strict';

/**
 * Module dependencies
 */
var themesPolicy = require('../policies/themes.server.policy'),
  themes = require('../controllers/themes.server.controller');

module.exports = function (app) {
  // Themes collection routes
  app.route('/api/themes').all(themesPolicy.isAllowed)
    .get(themes.list)
    .post(themes.create);

  // Single theme routes
  app.route('/api/themes/:themeId').all(themesPolicy.isAllowed)
    .get(themes.read)
    .put(themes.update)
    .delete(themes.delete);

  // Finish by binding the theme middleware
  app.param('themeId', themes.themeByID);
};
