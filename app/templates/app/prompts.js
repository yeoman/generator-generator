'use strict';

var prompts = [
  {
    type: 'confirm',
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: true
  },
  {
    type:'confirm',
    name:'confirmOption',
    message:'You answered yes. Are you sure?',
    when:function (answers) {
      return answers.someOption;
    },
    default:true
  }
];

function hasFeature (feature) {
  return function (answers) {
    return answers[feature];
  };
}

function hasFeatureChoice (answers,choice) {
  return (answers) ? answers.indexOf(choice) !== -1 : false;
}

module.exports = prompts;
