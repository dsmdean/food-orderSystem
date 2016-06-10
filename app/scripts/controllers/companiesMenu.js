'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('CompaniesMenuCtrl', ['$scope', 'companyFactory', 'companyDishesFactory', '$state', '$stateParams', function ($scope, companyFactory, companyDishesFactory, $state, $stateParams) {
        
        $scope.company = companyFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.company = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
        
        $scope.dishes = companyDishesFactory.query({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.dishes = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
    }]);
