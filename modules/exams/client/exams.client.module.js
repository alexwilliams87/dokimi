(function (app) {
  'use strict';

  app.registerModule('exams', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('exams.admin', ['core.admin']);
  app.registerModule('exams.admin.routes', ['core.admin.routes']);
  app.registerModule('exams.staff', ['core.staff']);
  app.registerModule('exams.staff.routes', ['core.staff.routes']);
  app.registerModule('exams.services');
  app.registerModule('exams.routes', ['ui.router', 'core.routes', 'exams.services']);
}(ApplicationConfiguration));
