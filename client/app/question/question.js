'use strict';

angular.module('easyQaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questions', {
        url: '/question',
        templateUrl: 'app/question/question.html',
        controller: 'QuestionCtrl'
      });
  });