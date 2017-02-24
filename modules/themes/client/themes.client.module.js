(function (app) {
  'use strict';

  app.registerModule('themes', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('themes.admin', ['core.admin']);
  app.registerModule('themes.admin.routes', ['core.admin.routes']);
  app.registerModule('themes.services');
  app.registerModule('themes.routes', ['ui.router', 'core.routes', 'themes.services']);
}(ApplicationConfiguration));
