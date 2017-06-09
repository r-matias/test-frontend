(function () {
    'use strict';

    angular.module('myApp').config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                controllerAs: 'vm',
                templateUrl: 'pages/entry/index.html',
            });

        $locationProvider.html5Mode(true);
    });
})();