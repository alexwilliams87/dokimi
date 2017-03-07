(function (app) {
  'use strict';

  app.registerModule('themes', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('themes.staff', ['core.staff']);
  app.registerModule('themes.staff.routes', ['core.staff.routes']);
  app.registerModule('themes.services');
}(ApplicationConfiguration));
