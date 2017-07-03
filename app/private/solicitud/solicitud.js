'use strict';

angular.module('dashboard.solicitud', [])

    .controller('SolicitudCtrl', ['$scope', function ($scope) {

        $scope.porcentajes = porcentajes;

        $scope.nuevasol = false;
        $scope.openNewSol = function(){
            $scope.nuevasol = true;
        };

        $scope.closeNewSol = function(){
            $scope.nuevasol = false;
            console.log('hola');
        }

    }])