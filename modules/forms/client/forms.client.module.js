(function (app) {
  'use strict';

  app.registerModule('forms', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('forms.admin', ['core.admin']);
  app.registerModule('forms.admin.routes', ['core.admin.routes']);
  app.registerModule('forms.staff', ['core.staff']);
  app.registerModule('forms.staff.routes', ['core.staff.routes']);
  app.registerModule('forms.services');
  app.registerModule('forms.routes', ['ui.router', 'core.routes', 'forms.services']);
}(ApplicationConfiguration));
