angular.module('ccApp.controllers', []).
  controller('EditorController', ['$scope', '$document', function($scope, $document) {
    
    $scope.test = 'boo!';
    
    $scope.publish = function() {
        var frame = angular.element(document.querySelector('#previewWindow'))[0];
        var doc = frame.contentDocument || frame.contentWindow.document;
        angular.element(doc).find('body').html(editor.getValue());
    };
  }]);