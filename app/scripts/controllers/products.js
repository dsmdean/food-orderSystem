'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('ProductsCtrl', ['$scope', 'companyDishesFactory', 'dishesFactory', '$state', '$stateParams', '$localStorage', function ($scope, companyDishesFactory, dishesFactory, $state, $stateParams, $localStorage) {
        $scope.localstorage = $localStorage.getObject('Token','{}');
        
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
        
        $scope.deleteProduct = function(productId) {
            console.log('Delete category', productId);
            dishesFactory.delete({id: productId});
            $state.go($state.current, {}, {reload: true});
        };
    }]);
