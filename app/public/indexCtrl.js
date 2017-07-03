'use strict';

angular.module('foraneos.controller', [])

    .controller('IndexCtrl', ['$scope', '$state', function ($scope, $state) {
        $state.go('signin');
    }])