(function () {
  'use strict';

  angular
    .module('exams')
    .controller('ExamsStaffController', ExamsStaffController);

  ExamsStaffController.$inject = ['$scope','$state', '$http', 'examResolve', 'Notification'];

  function ExamsStaffController($scope, $state, $http, exam, Notification) {
    var vm = this;

    vm.exam = exam;
    vm.save = save;
    vm.validate = validate;
    vm.unvalidate = unvalidate;
    vm.progress = progress;
    vm.i = 0;

    function validate() {
      vm.exam.points += vm.exam.form.questions[vm.i].points;
      vm.i++;
      progress();
    }

    function unvalidate() {
      vm.i++;
      progress();
    }

    function progress() {
      vm.exam.state = 'progress';

      for (; vm.i < vm.exam.answers.length; vm.i++) {
        var question = vm.exam.form.questions[vm.i];
        var answer = vm.exam.answers[vm.i];

        answer.results = answer.results || [];

        switch(question.body.type) {
          case 'radio':
          case 'checkbox':
          case 'boolean':
          case 'missing':
            if (angular.equals(answer.results, question.body.results)) {
              vm.exam.points += question.points;
            }
            break;

          case 'ranking':
            var valid = true,
                results = {},
                answerResults = answer.results,
                questionResults = question.body.results;

            for (var i = 0; i < questionResults[0].items.length; i++) {
              results[questionResults[0].items[i].id] = questionResults[1].items[i].id;
            }

            for (var i = 0; i < questionResults[0].items.length; i++) {
              if (results[answerResults[0].items[i].id] !== answerResults[1].items[i].id) {
                valid = false;
              }
            }

            if (valid) vm.exam.points += question.points;
            break;

          case 'opened':
            vm.question = question;
            return;
        }
      }

      // Correction end & save
      vm.exam.state = 'checked';
      return save();
    }

    // Save exam
    function save() {
      vm.exam.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);
    }

    function successCallback(res) {
      $state.go('staff.exams.list'); // should we send the User to the list or the updated Domain's view?
      Notification.success({ message: '<i class="material-icons">check_circle</i> Correction effectuée avec succès' });
    }

    function errorCallback(res) {
      Notification.error({ message: res.data.message, title: '<i class="material-icons">report_problem</i> Erreur lors de la sauvegarde' });
    }

  }
}());
