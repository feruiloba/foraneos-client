'use strict';

angular.module('foraneos.address', [])

.controller('AddressCtrl', ['$scope', 'uiGmapGoogleMapApi', 'register', '$http', function ($scope, uiGmapGoogleMapApi, register, $http) {

    var userData = register.get();
    var addressData = {};

    $scope.map = {
        center: {latitude: 21.924780, longitude: -102.304816},
        zoom: 15,
        options: {mapTypeId: "terrain", disableDefaultUI:true, zoomControl: true},
        search: {
            template: 'address/searchbox.html',
            parent: 'searchbox',
            events: {
                places_changed: function (searchBox) {
                    if (searchBox.getPlaces().length === 0)
                        return;
                    $scope.map.marker.idKey++;
                    $scope.map.search.place = searchBox.getPlaces()[0];
                    var coords = {
                        latitude: $scope.map.search.place.geometry.location.lat(),
                        longitude: $scope.map.search.place.geometry.location.lng()
                    };
                    $scope.map.marker.coords = coords;
                    $scope.map.center = coords;
                }
            }
        },
        marker: {
            idKey: 1,
            coords: undefined,
            options: {draggable: true}
        }
    };

    $scope.onSubmit = function(){
        $scope.$broadcast('show-errors-check-validity');
        if($scope.addressForm.$invalid || $scope.map.search.place==undefined){return;}
        setAddressData($scope.map.search.place);
        postForaneo();
    };

    var postForaneo = function(){
        console.log(userData);
        console.log(addressData);
        $http.post('https://foraneos-server.herokuapp.com/foraneos', {foraneo:userData,direccion:addressData}).success(function(){
            console.log('Agregado correctamente');
        });
    };


    var setAddressData = function(place){

        var i = 0; var ciudad = false; var colonia =false; var estado = false;
        var deleg_municip = false; var calle=false; var num = false; var cp = false;

        while(i<place.address_components.length && (!colonia || !ciudad || !estado || !deleg_municip || !calle || !num || !cp)){

            var j=0;
            var types=place.address_components[i].types;
            while(j<types.length){

                switch (types[j]){
                    case 'street_number':
                        if(!num){
                            addressData.num = place.address_components[i].long_name;
                            num = true;
                        }
                        break;
                    case 'route':
                        if(!calle){
                            addressData.calle = place.address_components[i].long_name;
                            calle = true;
                        }
                        break;
                    case 'administrative_area_level_2':
                    case 'administrative_area_level_3':
                        if(!deleg_municip){
                            addressData.deleg_municip = place.address_components[i].long_name;
                            deleg_municip = true;
                        }
                        break;
                    case 'locality':
                        if(!ciudad){
                            addressData.ciudad = place.address_components[i].long_name;
                            ciudad = true;
                        }
                        break;
                    case 'neighborhood':
                    case 'sublocality':
                        if(!colonia){
                            addressData.colonia = place.address_components[i].long_name;
                            colonia = true;
                        }
                        break;
                    case 'administrative_area_level_1':
                        if(!estado){
                            addressData.estado = place.address_components[i].long_name;
                            estado = true;
                        }
                        break;
                    case 'postal_code':
                        if(!cp){
                            addressData.cp = place.address_components[i].long_name;
                            cp = true;
                        }
                        break;
                }
                j++;
            }
            i++;
        }

        addressData.latitud = $scope.map.center.latitude;
        addressData.longitud = $scope.map.center.longitude;

        if(!calle)
            addressData.calle = "";
        if(!num)
            addressData.num = "";
        if(!deleg_municip)
            addressData.deleg_municip = "";
        if(!colonia)
            addressData.colonia = "";
        if(!estado)
            addressData.estado = "";
        if(!ciudad)
            addressData.ciudad = "";
        if(!cp)
            addressData.cp = "";
    };
    

}])