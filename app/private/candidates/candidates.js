'use strict';

angular.module('dashboard.candidates', [])

    .controller('CandidatesCtrl', ['$scope',function ($scope) {

        $scope.propertyName = 'cu';
        $scope.reverse = true;
        $scope.solicitudes = solicitudes;

        $scope.sortBy = function(propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };

        $scope.changeColor = function(parent, index){
            console.log(parent);
            console.log(parent.solicitudes[index]);
        };

    }])