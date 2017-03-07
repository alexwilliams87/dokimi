(function (app) {
  'use strict';

  app.registerModule('receivers', ['core']);
  app.registerModule('receivers.staff', ['core.staff']);
  app.registerModule('receivers.staff.routes', ['core.staff.routes']);
  app.registerModule('receivers.services');
}(ApplicationConfiguration));
