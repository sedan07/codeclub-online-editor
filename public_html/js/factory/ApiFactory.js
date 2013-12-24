angular.module('ccApp.factory', []).factory('ApiFactory',['$http', 'apiPrefix', function ($http, apiPrefix) {
    'use strict';
    
    return {
        get: function (id, successCallBack, errorCallBack) {
            return $http({method: 'GET', url: apiPrefix+'/'+id})
                .success(successCallBack)
                .error(errorCallBack);
        },
        update: function (id, data, successCallBack, errorCallBack) {
            return $http({method: 'PUT', url: apiPrefix+'/'+id, data: data})
                .success(successCallBack)
                .error(errorCallBack);
        },
        create: function (successCallBack, errorCallBack) {
            return $http({method: 'POST', url: apiPrefix})
                .success(successCallBack)
                .error(errorCallBack);
        }
    };

}]);