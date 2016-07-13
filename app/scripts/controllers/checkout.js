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
        $scope.cartTotal = 0;
        $scope.localstorage = $localStorage.getObject('Token','{}');
        $scope.cart = $localStorage.getObject('cart','[]');

        for(var i = 0; i < $scope.cart.length; i++) {
            $scope.cartTotal += $scope.cart[i].totalPrice;
        }

        for(var i = 0, len = localStorage.length; i < len; i++) {
            var key = localStorage.key(i);
            var json = localStorage.getItem(key);
            var result = JSON.parse(json);
            var cart_id;

            if(key.indexOf('cart_') === 0) {
                cart_id = $localStorage.getObject(key,'{}');
                cart_id.userId = $scope.localstorage.id;
                $localStorage.storeObject(key, cart_id);
            }
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
            for(var i = 0, len = localStorage.length; i < len; i++) {
                var key = localStorage.key(i);
                var json = localStorage.getItem(key);
                var result = JSON.parse(json);
                var cart_id;

                if(key.indexOf('cart_') === 0) {
                    cart_id = $localStorage.getObject(key,'{}');
                    console.log(key);
                    //ordersFactory.save(cart_id);
                    $localStorage.remove(key);
                }
            }
            $localStorage.remove('cart');

            $scope.checkoutSuccess = true;
        }
    }]);