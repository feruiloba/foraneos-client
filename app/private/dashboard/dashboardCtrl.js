'use strict';

angular.module('dashboard.controller', [])

.controller('DashboardCtrl', ['$scope', '$window', '$state', '$rootScope', function ($scope, $window, $state, $rootScope) {

    $scope.signOut = function(){
        $window.location = '/';
    }

    $state.go('solicitud');




}])