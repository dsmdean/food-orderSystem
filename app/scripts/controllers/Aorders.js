'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('AOrdersCtrl', ['$scope', '$state', 'companyOrdersFactory', 'ordersFactory', '$localStorage', function ($scope, $state, companyOrdersFactory, ordersFactory, $localStorage) {
        $scope.companyB = false;
        $scope.adminB = false;
        $scope.localstorage = $localStorage.getObject('Token','{}');

        if('companyId' in $scope.localstorage) {
            $scope.companyB = true;

            companyOrdersFactory.query({
                id: $scope.localstorage.companyId
            })
            .$promise.then(
                function (response) {
                    $scope.orders = response;

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
        } else if('admin' in $scope.localstorage) {
            $scope.adminB = true;

            ordersFactory.query(
                function (response) {
                    $scope.orders = response;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
        }
    }]);
