var _ = require('lodash');

exports.body = function(data) {
  try {
    QuestionBodyValidator(data);
  }
  catch(error) {
    console.log(error);
    return false;
  }

  return true;
};


function QuestionBodyValidator(data) {
  if (_.isEmpty(data.response)) throw new Error('Response is empty');

  switch(data.type) {

    case 'checkbox':
    case 'radio':
      var checked = null;
      if (!_.isArray(data.response)) throw new Error('Response not an array');

      data.response.forEach(function(item) {
        if (_.isEmpty(item.value) || !_.isBoolean(item.checked)) throw new Error('Item value or checked not valid');
        if (item.checked === true) checked = true;
      });

      if (!checked) {
        throw new Error('Nothing checked');
      }
      break;


    case 'boolean':
      var checked = null;
      if (!_.isArray(data.response)) throw new Error('Response not an array');

      data.response.forEach(function(item) {
        if (_.isEmpty(item.value) || !_.isBoolean(item.checked) || !_.isBoolean(item.assign)) throw new Error('Item value, checked or assign not valid');
        if (item.checked === true) checked = true;
      });

      if (!checked) {
        throw new Error('Nothing checked');
      }
      break;


    case 'regmissing':
    case 'missing':
      if (!_.isObject(data.response)) throw new Error('Response not an object');
      if (!_.isArray(data.response.values)) throw new Error('Response values not an array');
      if (_.isEmpty(data.response.content)) throw new Error('Response content is empty');
      if (_.isEmpty(data.response.values)) throw new Error('Response values is empty');

      data.response.values.forEach(function(item) {
        if (_.isEmpty(item)) throw new Error('Item in response values is empty');
      });

      var match = data.response.content.match(/%s/g);

      if (match && match.length !== data.response.values.length) {
        throw new Error('Response malformated');
      }
      break;


    case 'ranking':
      if (!_.isArray(data.response)) throw new Error('Response not an array');

      data.response.forEach(function(list) {
        if (!_.isObject(list)) throw new Error('Response list not an object');
        if (!_.isArray(list.items)) throw new Error('Response list items not an array');
        if (_.isEmpty(list.items)) throw new Error('Response list items empty');

        list.items.forEach(function(item) {
          if (_.isEmpty(item.value)) throw new Error('Item value is empty');
          if (item.media !== 'text' && item.media !== 'image') throw new Error('Item type not available');
        });
      });

      if (data.response[0].items.length !== data.response[1].items.length) {
        throw new Error('Response malformated');
      }
      break;
  }
};
