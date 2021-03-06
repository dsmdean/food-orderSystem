'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('AProductsCtrl', ['$scope', 'companyDishesFactory', 'dishesFactory', '$state', '$stateParams', '$localStorage', function ($scope, companyDishesFactory, dishesFactory, $state, $stateParams, $localStorage) {
        $scope.companyB = false;
        $scope.adminB = false;
        $scope.localstorage = $localStorage.getObject('Token','{}');
        
        if('companyId' in $scope.localstorage) {
            $scope.companyB = true;
            
            companyDishesFactory.query({
                id: $scope.localstorage.companyId
            })
            .$promise.then(
                function (response) {
                    $scope.products = response;

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
        } else if('admin' in $scope.localstorage) {
            $scope.adminB = true;
            
            dishesFactory.query(
                function (response) {
                    $scope.products = response;

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
        }

        $scope.deleteProduct = function(productId) {
            console.log('Delete category', productId);
            dishesFactory.delete({id: productId});
            $state.go($state.current, {}, {reload: true});
        };
    }]);
