angular.module('ccApp.controllers').
  controller('EditorController', ['$scope', 'localStorageService', '$timeout', 'ApiFactory', '$routeParams', '$rootScope', function($scope, localStorageService, $timeout, ApiFactory, $routeParams, $rootScope) {
    
    $scope.project = {
        files: {
            html: '<h1>My First HTML Page</h1>',
            css: 'h1 {\n color: blue; \n}'
        },
        name: '',
        id: $routeParams.id
    };
    
    $scope.sessions = {};
    $scope.currentTab = 'html';
    $scope.editor = null;
    $scope.localStoragePromise = null;
    $scope.failedSave = false;
    $scope.successfulSave = false;
    
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        if (/new/.test(next) === false) {
            return true;
        }
        if (! confirm('Are you sure you want to leave this page?')) {
            event.preventDefault();
        }
    });
    
    $scope.publish = function() {
        $scope.save();
        
        var frame = angular.element(document.querySelector('#previewWindow'))[0];
        var doc = frame.contentDocument || frame.contentWindow.document;
        angular.element(doc).find('style').remove();
        
        angular.element(doc).find('body').html($scope.project.files.html);
        
        var styles = angular.element('<style type="text/css"></style>')
        styles.html($scope.project.files.css);
        angular.element(doc).find('head').append(styles);
    };
    
    $scope.changeTab = function(newTab) {
        $scope.project.files[$scope.currentTab] = $scope.editor.getValue();
        $scope.currentTab = newTab;
        $scope.editor.setSession($scope.sessions[$scope.currentTab]);
    };
    
    $scope.hidePlaceholder = function() {
        var frame = angular.element(document.querySelector('#previewWindow'))[0];
        var doc = frame.contentDocument || frame.contentWindow.document;
        if (angular.element(doc).find('body').html() === '') {
            return false;
        }
        return true;
    };
    
    $scope.save = function() {
        $scope.failedSave = false;
        $scope.successfulSave = false;
        $scope.project.files[$scope.currentTab] = $scope.editor.getValue();
        
        // make HTTP request
        ApiFactory.update($routeParams.id, 
                          $scope.project,
        function(data) {
            $scope.successfulSave = true;
        }, function(data) {
            $scope.failedSave = true;
        });
        
        if ($scope.localStoragePromise) {
            $timeout.cancel($scope.localStoragePromise);
        }
        $scope.localStoragePromise = $timeout(function() {
            localStorageService.add($routeParams.id, JSON.stringify($scope.project));
        });
    };
    
    $scope.aceLoaded = function(_editor){
        // Editor part
        $scope.editor = _editor;
        
        //Creating some sessions!
        for (file in $scope.project.files) {
            $scope.sessions[file] = ace.createEditSession($scope.project.files[file]);
            $scope.sessions[file].setMode("ace/mode/" + file);
            $scope.sessions[file].setUndoManager(new ace.UndoManager()); 
        }
        
        $scope.changeTab($scope.currentTab);
    };
    
    init = function() {
        var cache = localStorageService.get($routeParams.id);
        if (cache) {
            var parsedCache = JSON.parse(cache);
            if (parsedCache.files) {
                $scope.project = parsedCache;
            } else {
                $scope.project.files = parsedCache;
            }
            if ($scope.project.id == undefined) {
                $scope.project.id = $routeParams.id;
            }
        } else {
            // load it from the server
            ApiFactory.get($routeParams.id, function(data) {
                if (data.files != undefined) {
                    $scope.project.name = data.name;
                    for (file in data.files) {
                        $scope.project.files[data.files[file].type] = data.files[file].contents;
                    }
                    for (file in $scope.project.files) {
            $scope.sessions[file] = ace.createEditSession($scope.project.files[file]);
            $scope.sessions[file].setMode("ace/mode/" + file);
            $scope.sessions[file].setUndoManager(new ace.UndoManager()); 
        }
        
        $scope.editor.setSession($scope.sessions[$scope.currentTab]);
                }
            }, function(data) {
                alert('Oh dear me.... something went wrong');
            });
        }
    };
    
    init();
  }]);