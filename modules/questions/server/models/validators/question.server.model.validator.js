var _ = require('lodash');

exports.body = function(body) {
  try {
    QuestionBodyValidator(body);
  }
  catch(error) {
    console.log(error);
    return false;
  }

  return true;
};


function QuestionBodyValidator(body) {
  switch(body.type) {

    case 'checkbox':
    case 'boolean':
    case 'radio':
      var checked = null;
      if (!_.isArray(body.results)) throw new Error('Question <select> results not an array');
      if (_.isEmpty(body.data)) throw new Error('Question <select> data is empty');
      if (!_.isArray(body.data)) throw new Error('Question <select> data not an array');

      body.data.forEach(function(item) {
        if (_.isEmpty(item.value)) throw new Error('Question <select> item value not valid');
      });

      body.results.forEach(function(result) {
        if (!_.isBoolean(result.checked)) throw new Error('Question <select> item checked status is not valid');
        if (result.checked === true) checked = true;
      });

      if (!checked) {
        throw new Error('Nothing checked');
      }
      break;


    case 'regmissing':
    case 'missing':
      if (!_.isArray(body.results)) throw new Error('Question <missing> results not an array');
      if (_.isEmpty(body.data)) throw new Error('Question <missing> data is empty');
      if (!_.isString(body.data)) throw new Error('Question <missing> data not a string');

      body.results.forEach(function(result) {
        if (_.isEmpty(result)) throw new Error('Question <missing> item value in result is empty');
      });

      var match = body.data.match(/%s/g);

      if (match && match.length !== body.results.length) {
        throw new Error('Question <missing> malformated');
      }
      break;


    case 'ranking':
      if (!_.isArray(body.results)) throw new Error('Question <ranking> results not an array');
      if (_.isEmpty(body.data)) throw new Error('Question <ranking> is empty');
      if (!_.isArray(body.data)) throw new Error('Question <ranking> data not an array');

      body.data.forEach(function(list) {
        if (!_.isObject(list)) throw new Error('Question <ranking> list not an object');
        if (!_.isArray(list.items) || _.isEmpty(list.items)) throw new Error('Question <ranking> list items not an array or empty');

        list.items.forEach(function(item) {
          if (_.isEmpty(item.value)) throw new Error('Question <ranking> item value is empty');
          if (item.media !== 'text' && item.media !== 'image') throw new Error('Question <ranking> item type not available');
        });
      });

      if (body.data[0].items.length !== body.data[1].items.length) {
        throw new Error('Question <ranking> malformated');
      }
      break;


    case 'opened':
      body.results.forEach(function(result) {
        if (!_.isString(result)) throw new Error('Question <opened> item malformated !');
      });
      break;


    default:
      throw new Error('Type Question unknown !');
  }
};
