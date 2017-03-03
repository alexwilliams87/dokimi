var _ = require('lodash'),
    path = require('path'),
    QuestionValidator = require(path.resolve('./modules/questions/server/models/validators/question.server.model.validator'));

exports.questions = function(questions) {
  try {
    FormQuestionsValidator(questions);
  }
  catch(error) {
    console.log(error);
    return false;
  }

  return true;
};


function FormQuestionsValidator(questions) {
  if (_.isEmpty(questions)) throw new Error('Form Questions is empty');

  questions.forEach(function(question) {
    if (!_.isObject(question)) throw new Error('One question is not an object');
    if (!QuestionValidator.body(question.body)) {
      throw new Error('Response body not conform');
    }
  });
};
