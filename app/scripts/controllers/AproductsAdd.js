'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('ProductAddCtrl', ['$scope', 'dishesFactory', 'dishesCategoryFactory', '$state', '$localStorage', function ($scope, dishesFactory, dishesCategoryFactory, $state, $localStorage) {
        $scope.localstorage = $localStorage.getObject('Token','{}');
        
        $scope.product = {
            companyId: $scope.localstorage.companyId,
            name: "",
            image: "",
            categoryId: "",
            price: "",
            description: ""
        };
        
        $scope.dishCategory = dishesCategoryFactory.query({
            id: $scope.product.companyId
        })
        .$promise.then(
            function (response) {
                $scope.dishCategory = response;
                console.log(response);
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
        
        $scope.addProduct = function() {
            dishesFactory.save($scope.product);
            $state.go('app.admin-products');
        };
    }]);