'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('ProductDetailsCtrl', ['$scope', 'dishesFactory', 'dishesCategoryFactory', '$stateParams', '$state', function ($scope, dishesFactory, dishesCategoryFactory, $stateParams, $state) {
        $scope.productUpdated = {
            companyId: "",
            name: "",
            categoryId: "",
            price: "",
            stock: "",
            description: ""
        };
        
        $scope.product = dishesFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.product = response;
                $scope.productUpdated.companyId = response.companyId._id;
                $scope.productUpdated.name = response.name;
                $scope.productUpdated.categoryId = response.categoryId;
                $scope.productUpdated.price = response.price;
                $scope.productUpdated.stock = response.stock;
                $scope.productUpdated.description = response.description;
                
                $scope.dishCategory = dishesCategoryFactory.query({
                    id: $scope.product.companyId._id
                })
                .$promise.then(
                    function (response) {
                        $scope.dishCategory = response;
                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
        
        $scope.updateProduct = function() {
            dishesFactory.update({id: $scope.product._id}, $scope.productUpdated);
            $state.go('app.admin-products');
        };
    }]);