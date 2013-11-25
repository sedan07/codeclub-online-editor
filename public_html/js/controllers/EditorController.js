angular.module('ccApp.controllers', ['LocalStorageModule']).
  controller('EditorController', ['$scope', 'localStorageService', '$timeout', function($scope, localStorageService, $timeout) {
    
    $scope.files = {
        html: '<h1>My First HTML Page</h1>',
        css: 'h1 {\n color: blue; \n}'
    };
    
    $scope.sessions = {};
    $scope.currentTab = 'html';
    $scope.editor = null;
    $scope.localStoragePromise = null;
    
    $scope.publish = function() {
        $scope.save();
        
        var frame = angular.element(document.querySelector('#previewWindow'))[0];
        var doc = frame.contentDocument || frame.contentWindow.document;
        angular.element(doc).find('body').html($scope.files.html);
        
        var styles = angular.element('<style type="text/css"></style>')
        styles.html($scope.files.css);
        angular.element(doc).find('head style').remove();
        angular.element(doc).find('head').append(styles);
    };
    
    $scope.changeTab = function(newTab) {
        $scope.currentTab = newTab;
        $scope.editor.setSession($scope.sessions[$scope.currentTab]);
        $scope.files[$scope.currentTab] = $scope.editor.getValue();
    }
    
    $scope.save = function() {
        if ($scope.localStoragePromise) {
            $timeout.cancel($scope.localStoragePromise);
        }
        $scope.localStoragePromise = $timeout(function() {
            localStorageService.add('data_cache',JSON.stringify($scope.files));
        });
    }
    
    $scope.aceLoaded = function(_editor){
        // Editor part
        $scope.editor = _editor;
        
        //Creating some sessions!
        for (file in $scope.files) {
            $scope.sessions[file] = ace.createEditSession($scope.files[file]);
            $scope.sessions[file].setMode("ace/mode/" + file);
            $scope.sessions[file].setUndoManager(new ace.UndoManager()); 
        }
        
        $scope.changeTab($scope.currentTab);
    };
    
    init = function() {
        var cache = localStorageService.get('data_cache');
        if (cache) {
            $scope.files = JSON.parse(cache);
        }  
    };
    
    init();
  }]);