'use strict';

angular.module('foraneos.signin', [])

    .controller('SignInCtrl', ['$scope', '$window', function($scope, $window){
        $scope.onSubmit = function(){
            if($scope.signInForm.$invalid){return;}
            $scope.postUser();
        };

        $scope.postUser = function(){

            /*$http.post('/user/signin',$scope.userData).success(function(data){
                console.log(data);
                if(data.error){

                }
                else{

                }*/

            signInSuccess();
            //});
        };

        var signInSuccess = function(){
            console.log('User sign in success');
            $window.location.assign('http://localhost:63342/For%C3%A1neos/foraneos-client/app/private/dashboard/dashboard.html');
        }
    }])