(function (app) {
  'use strict';

  app.registerModule('forms', ['core']);
  app.registerModule('forms.staff', ['core.staff', 'ngStorage']);
  app.registerModule('forms.staff.routes', ['core.staff.routes']);
  app.registerModule('forms.services');
}(ApplicationConfiguration));
