'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('OrdersCtrl', ['$scope', '$state', 'userOrdersFactory', 'AuthFactory', '$localStorage', function ($scope, $state, userOrdersFactory, AuthFactory, $localStorage) {
        $scope.localstorage = $localStorage.getObject('Token','{}');

        if(AuthFactory.isAuthenticated()) {
            userOrdersFactory.query({
                id: $scope.localstorage.id
            })
            .$promise.then(
                function (response) {
                    $scope.orders = response;

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
        } 
    }]);
