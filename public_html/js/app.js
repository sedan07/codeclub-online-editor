var ccApp = angular.module('ccApp', [
    'ui.ace',
    'ngRoute',
    'ccApp.factory',
    'ccApp.controllers'
]);

ccApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/new', {
        //templateUrl: 'partials/phone-detail.html',
        //template: '',
        templateUrl: 'partials/empty.html',
        controller: 'CreateController'
      }).
      when('/:id', {
        templateUrl: 'partials/editor.html',
        controller: 'EditorController'
      }).
      otherwise({
        redirectTo: '/new'
      });
  }]);