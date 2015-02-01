'use strict';

angular.module('easyQaApp')
  .controller('QuestionCtrl', function ($scope, $http, socket) {
    $scope.questions = [];

    $http.get('/api/questions').success(function(questions) {
      $scope.questions = questions;
      socket.syncUpdates('questions', $scope.questions);
    });

    $scope.addQuestion = function() {
      if($scope.newQuestion === '') {
        return;
      }
      console.log($scope.newQuestion);
      $scope.newQuestion.answers = [{answer: $scope.answer, isCorrect: true}];
      $http.post('/api/questions', $scope.newQuestion);
      $scope.newQuestion = {};
    };

    $scope.deleteQuestion = function(question) {
      $http.delete('/api/questions/' + question._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('question');
    });
  });
