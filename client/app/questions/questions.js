'use strict';

angular.module('easyQaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questions', {
        url: '/questions',
        templateUrl: 'app/questions/questions.html',
        controller: 'QuestionsCtrl'
      });
  });