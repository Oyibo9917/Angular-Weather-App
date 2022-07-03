//MODULE
var weatherApp = angular.module('weatherApp',['ngRoute', 'ngResource']);

//ROUTES
weatherApp.config(function($routeProvider){
    
    $routeProvider

    .when('/',{
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })

    .when('/forecast',{
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })

});

// SERVICES
weatherApp.service('cityService', function() {

    this.city  = 'New York, NY';

})

//CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){

    $scope.city = cityService.city;

    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    })

}]);

weatherApp.controller('forecastController', ['$scope', '$http', '$resource', '$routeParams', 'cityService', 
    function($scope, $http, $resource, $routeParams, cityService){

    const apiURL = 'http://api.weatherstack.com/current?access_key=dae43f3d982a36f37112aa92b1b522b4&query=';

    $scope.spinner = true;

    var city = cityService.city ?? 'Lagos';

    $http.get(getURL())
        .then(function (response) {
            var location = response.data.location;
            var current = response.data.current;

            $scope.country = location.country;
            $scope.region = location.region;
            $scope.timezone = location.timezone_id;
            $scope.localtime = location.localtime;

            $scope.weather_icons = current.weather_icons;
            $scope.temperature = current.temperature;
            $scope.weather_descriptions = current.weather_descriptions[0];
            $scope.is_day = current.is_day === 'yes' ? true : false;

            $scope.spinner = false;

        });

    function getURL(){
        if(city){
            return apiURL + city;
        }else{
            return apiURL + 'Lagos';
        }
    }

}]);