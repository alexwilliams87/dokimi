(function (app) {
  'use strict';

  app.registerModule('exams', ['core']);
  app.registerModule('exams.staff', ['core.staff']);
  app.registerModule('exams.staff.routes', ['core.staff.routes']);
  app.registerModule('exams.services');
  app.registerModule('exams.routes', ['ui.router', 'core.routes', 'exams.services']);
}(ApplicationConfiguration));
