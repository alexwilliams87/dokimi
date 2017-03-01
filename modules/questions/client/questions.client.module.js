(function (app) {
  'use strict';

  app.registerModule('questions', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('questions.admin', ['core.admin']);
  app.registerModule('questions.admin.routes', ['core.admin.routes']);
  app.registerModule('questions.staff', ['core.staff']);
  app.registerModule('questions.staff.routes', ['core.staff.routes']);
  app.registerModule('questions.services');
  app.registerModule('questions.routes', ['ui.router', 'core.routes', 'questions.services']);
}(ApplicationConfiguration));
