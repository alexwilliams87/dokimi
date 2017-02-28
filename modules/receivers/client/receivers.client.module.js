(function (app) {
  'use strict';

  app.registerModule('receivers', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('receivers.admin', ['core.admin']);
  app.registerModule('receivers.admin.routes', ['core.admin.routes']);
  app.registerModule('receivers.services');
  app.registerModule('receivers.routes', ['ui.router', 'core.routes', 'receivers.services']);
}(ApplicationConfiguration));
