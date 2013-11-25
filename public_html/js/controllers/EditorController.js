angular.module('ccApp.controllers', ['LocalStorageModule']).
  controller('EditorController', ['$scope', 'localStorageService', function($scope, localStorageService) {
    
    $scope.files = {
        html: '<h1>My First HTML Page</h1>',
        css: 'h1 {\n color: blue; \n}'
    };
    
    $scope.sessions = {};
    
    $scope.currentTab = 'html';
    $scope.editor = null;
    
    $scope.publish = function() {
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
        //console.log(JSON.stringify($scope.sessions[$scope.currentTab]));
        $scope.files[$scope.currentTab] = $scope.editor.getValue();
        localStorageService.add('data_cache',JSON.stringify($scope.files));
        //$scope.editor.setValue($scope.files[newTab]);
    }
    
    $scope.aceLoaded = function(_editor){
        // Editor part
        $scope.editor = _editor;
        
        //Creating some sessions!
        $scope.sessions['html'] = ace.createEditSession($scope.files['html']);
        $scope.sessions['html'].setUndoManager(new ace.UndoManager()); 
        $scope.sessions['css'] = ace.createEditSession($scope.files['css']);
        $scope.sessions['css'].setUndoManager(new ace.UndoManager());
        
        $scope.changeTab($scope.currentTab);
    };
    
    main = function() {
        var cache = localStorageService.get('data_cache');
        if (cache) {
            $scope.files = JSON.parse(cache);
        }
//        $scope.editor = ace.edit("editor");
//        $scope.editor.setTheme("ace/theme/monokai");
//        $scope.changeTab('html');
//        
        
    };
    
    
    
    main();
    
  }]);