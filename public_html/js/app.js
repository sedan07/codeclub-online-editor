var ccApp = angular.module('ccApp', [
    'ui.ace',
    'ngRoute',
    'ccApp.factory',
    'ccApp.controllers'
]);

ccApp.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
        $routeProvider.
                when('/new', {
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

        // Setup for CORS
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);
