(function (app) {
  'use strict';

  app.registerModule('domains', ['core']);
  app.registerModule('domains.staff', ['core.staff']);
  app.registerModule('domains.staff.routes', ['core.staff.routes']);
  app.registerModule('domains.services');
}(ApplicationConfiguration));
