(function (app) {
  'use strict';

  app.registerModule('domains', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('domains.admin', ['core.admin']);
  app.registerModule('domains.admin.routes', ['core.admin.routes']);
  app.registerModule('domains.services');
  app.registerModule('domains.routes', ['ui.router', 'core.routes', 'domains.services']);
}(ApplicationConfiguration));
