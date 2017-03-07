(function (app) {
  'use strict';

  app.registerModule('questions', ['core']);
  app.registerModule('questions.staff', ['core.staff']);
  app.registerModule('questions.staff.routes', ['core.staff.routes']);
  app.registerModule('questions.services');
}(ApplicationConfiguration));
