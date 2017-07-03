'use strict';

angular.module('foraneos', [
    'ui.bootstrap',
    'ui.router',
    'uiGmapgoogle-maps',
    'foraneos.signin',
    'foraneos.controller',
    'foraneos.register',
    'foraneos.address'])

    .config(['$stateProvider', 'uiGmapGoogleMapApiProvider', function($stateProvider, uiGmapGoogleMapApiProvider){

        $stateProvider.state('signin', {
            views: {
                'form' : {templateUrl: 'signin/signin.html'}
            }
        });

        $stateProvider.state('register', {
            views: {
                'form' : {templateUrl: 'register/register.html'}
            }
        });

        $stateProvider.state('carrera', {
            views: {
                'form' : {templateUrl: 'register/carrera.html'}
            }
        });

        $stateProvider.state('address', {
            views: {
                'form' : {templateUrl: 'address/address.html'}
            }
        });

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyBkdCekG2w9hH4Bz_YqbRoFlppSze41mgg',
            v: '3.24',
            libraries: 'places'
        });

    }])

    .directive('showErrors', function() {
        return {
            restrict: 'A',
            require:  '^form',
            link: function (scope, elem, atrib, Ctrl) {
                //get the current inputForm
                var input = elem[0].querySelector("[name]");
                var inputNg = angular.element(input);
                var inputName = inputNg.attr('name');
                var inputForm = Ctrl[inputName];

                //when the user leaves the input field
                inputNg.bind('blur', function() {
                    if(!inputForm.$pristine) {
                        elem.toggleClass('has-error', inputForm.$invalid);
                        elem.toggleClass('has-success', inputForm.$valid);
                    }
                });

                //when the user submits the form
                scope.$on('show-errors-check-validity', function() {
                    elem.toggleClass('has-error', inputForm.$invalid);
                    elem.toggleClass('has-success', inputForm.$valid);
                });

            }
        };
    })

    .directive('compareTo', function(){
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function (scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function (modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function () {
                    ngModel.$validate();
                });
            }
        };
    })

function initMap(){
    console.log("Map initialized");
}