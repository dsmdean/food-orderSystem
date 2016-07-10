'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('CheckoutCtrl', ['$scope', '$localStorage', 'AuthFactory', 'userFactory', 'ordersFactory', '$rootScope', '$state', function ($scope, $localStorage, AuthFactory, userFactory, ordersFactory, $rootScope, $state) {
        $scope.checkoutSuccess = false;
        // $scope.cart = $localStorage.getObject('cart','{}');
        $scope.cart = [];
        $scope.localstorage = $localStorage.getObject('Token','{}');

        for ( var i = 0, len = localStorage.length; i < len; i++ ) {
            var key = localStorage.key(i);
            var json = localStorage.getItem(key);
            var result = JSON.parse(json);

            if(key.indexOf('cart') === 0) {
                $scope.cart.push(result);
            }
        }
        //console.log($scope.cart);
        $localStorage.storeObject('cart', $scope.cart);
        
        $scope.cartTotal = function() {
            var total = 0;
            for(var i = 0; i < $scope.cart.details.length; i++) {
                total += $scope.cart.details[i].SubTotalPrice;
            }

            $scope.cart.totalPrice = total;
        }

        $scope.minQuantity = function(index) {
            $scope.cart.details[index].quantity --;
            $scope.cart.details[index].SubTotalPrice = $scope.cart.details[index].quantity * $scope.cart.details[index].price;

            if($scope.cart.details[index].quantity == 0) {
                $scope.cart.details.splice(index, 1);
            }

            $scope.cartTotal();
            $localStorage.storeObject('cart', $scope.cart);
            $rootScope.$broadcast('cart:Edit');
        }

        $scope.goBack = function() {
            $localStorage.storeObject('cart', $scope.cart);
            window.history.back();
        }

        $scope.user = userFactory.get({
            id: $scope.localstorage.id
        })
        .$promise.then(
            function (response) {
                $scope.user = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        $scope.submitOrder = function() {
            ordersFactory.save($scope.cart);
            $scope.checkoutSuccess = true;
            $localStorage.remove('cart');
            //$state.go("app.order-finish");
        }
    }]);