'use strict';

angular.module('dashboard', [
    'ui.bootstrap',
    'ui.router',
    'dashboard.controller',
    'dashboard.candidates',
    'dashboard.solicitud'
])

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider.state('solicitud', {
                views: {
                    'listas':{templateUrl:"../candidates/candidates.html"},
                    'nuevos-botones': {templateUrl: "../solicitud/solicitud.html"}
                }
            })

            .state('informacion', {
                views: {
                    'listas':{template: ''},
                    'nuevos-botones':{template:''}
                }
            })

            .state('foraneos', {
                views: {
                    'listas':{template: ''},
                    'nuevos-botones':{template:''}
                }
            })
    }]);