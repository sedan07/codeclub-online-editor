angular.module('ccApp.factory', []).factory('ApiFactory', function ($http) {
    'use strict';

    return {
        get: function (id, successCallBack, errorCallBack) {
            return $http({method: 'GET', url: '/project/'+id})
                .success(successCallBack)
                .error(errorCallBack);
        },
        update: function (id, data, successCallBack, errorCallBack) {
            return $http({method: 'PUT', url: '/project/'+id, data: data})
                .success(successCallBack)
                .error(errorCallBack);
        },
        create: function (successCallBack, errorCallBack) {
            return $http({method: 'POST', url: '/project'})
                .success(successCallBack)
                .error(errorCallBack);
        }
    };

});