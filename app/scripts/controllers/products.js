'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('ProductsCtrl', ['$scope', 'dishesFactory', '$state', '$stateParams', '$localStorage', function ($scope, dishesFactory, $state, $stateParams, $localStorage) {
        
        dishesFactory.query(
            function (response) {
                $scope.products = response;

            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
        
    }]);
