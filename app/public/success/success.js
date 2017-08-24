'use strict';

angular.module('foraneos.success', [])

    .controller('SuccessCtrl', ['$scope', '$state', 'register', function($scope, $state, register){
        $scope.userData = register.get();
    }])