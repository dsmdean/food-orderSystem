'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('CheckoutCtrl', ['$scope', '$localStorage', 'AuthFactory', '$rootScope', '$state', function ($scope, $localStorage, AuthFactory, $rootScope, $state) {
        
        $scope.cart = $localStorage.getObject('cart','{}');

        $scope.cartTotal = function() {
            var total = 0;
            for(var i = 0; i < $scope.cart.products.length; i++) {
                total += $scope.cart.products[i].subtotal;
            }

            $scope.cart.total = total;
        }

        $scope.minQuantity = function(index) {
            $scope.cart.products[index].quantity --;
            $scope.cart.products[index].subtotal = $scope.cart.products[index].quantity * $scope.cart.products[index].price;

            if($scope.cart.products[index].quantity == 0) {
                $scope.cart.products.splice(index, 1);
            }

            $scope.cartTotal();
        }

        $scope.goBack = function() {
            window.history.back();
        }
    }]);