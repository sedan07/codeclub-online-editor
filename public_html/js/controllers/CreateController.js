angular.module('ccApp.controllers', ['LocalStorageModule', 'ccApp.factory']).
  controller('CreateController', ['$scope', 'ApiFactory', '$location', function($scope, ApiFactory, $location) {
   
        ApiFactory.create(function(data) {
            $location.path('/' + data.id);
        }, function(data) {
            alert('Error crsting new project');
        });
   
        
   
  }]);