angular.module('ccApp.controllers', ['LocalStorageModule']).
  controller('EditorController', ['$scope', 'localStorageService', function($scope, localStorageService) {
    
    $scope.files = {
        html: '<h1>My First HTML Page</h1>',
        css: 'h1 {\n color: blue; \n}'
    };
    
    $scope.currentTab = 'html';
    
    $scope.publish = function() {
        var frame = angular.element(document.querySelector('#previewWindow'))[0];
        var doc = frame.contentDocument || frame.contentWindow.document;
        angular.element(doc).find('body').html($scope.files.html);
        
        var styles = angular.element('<style type="text/css"></style>')
        styles.html($scope.files.css);
        angular.element(doc).find('head').html('');
        angular.element(doc).find('head').append(styles);
    };
    
    $scope.changeTab = function(newTab) {
        $scope.currentTab = newTab;
        $scope.editor.setValue($scope.files[newTab]);
        $scope.editor.getSession().setMode("ace/mode/"+newTab);
    }
    
    main = function() {
        var cache = localStorageService.get('data_cache');
        if (cache) {
            $scope.files = JSON.parse(cache);
        }
        $scope.editor = ace.edit("editor");
        $scope.editor.setTheme("ace/theme/monokai");
        $scope.changeTab('html');
        
        $scope.editor.getSession().on('change', function(e) {
            $scope.files[$scope.currentTab] = $scope.editor.getValue();
            localStorageService.add('data_cache',JSON.stringify($scope.files));
        });
    };
    
    
    
    main();
    
  }]);