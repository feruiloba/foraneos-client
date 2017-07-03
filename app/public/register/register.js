'use strict';

angular.module('foraneos.register', [])

.controller('RegisterCtrl', ['$scope', '$state', '$http', 'register', function($scope, $state, $http, register){
    $scope.days = days;
    $scope.months = months;
    $scope.years = years;
    $scope.ciudades = ciudades;
    $scope.lugares = lugares;
    $scope.semestres = semestres;
    $scope.carreras = carreras;

    $scope.userData = register.get();

    $scope.$watch('userData', function () {
        register.set($scope.userData);
    });

    $scope.siguiente = function(){
        $scope.$broadcast('show-errors-check-validity');
        if($scope.registerForm.$invalid){return;}
        $state.go('carrera');
    };

    $scope.siguiente2 = function(){
        $scope.$broadcast('show-errors-check-validity');
        if($scope.carreraForm.$invalid){return;}
        $state.go('address');
    };

    $scope.seleccionaCiudades = function(ciudades){
        $scope.ciudades = ciudades;
    };

}])
    .factory('register', function(){
        var userData = {};
        var get = function () {
            return userData;
        };

        var set = function (updated) {
            userData = updated;
        };

        var reset = function () {
            userData = {};
        };

        return {
            get: get,
            set: set,
            reset: reset
        };
    });