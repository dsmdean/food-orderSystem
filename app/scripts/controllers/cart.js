'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('CartCtrl', ['$scope', '$localStorage', 'AuthFactory', 'userFactory', 'ordersFactory', '$rootScope', '$state', function ($scope, $localStorage, AuthFactory, userFactory, ordersFactory, $rootScope, $state) {
        // $scope.cart = $localStorage.getObject('cart','{}');
        $scope.cart = [];
        $scope.cartTotal = 0;

        for ( var i = 0, len = localStorage.length; i < len; i++ ) {
            var key = localStorage.key(i);
            var json = localStorage.getItem(key);
            var result = JSON.parse(json);

            if(key.indexOf('cart_') === 0) {
                $scope.cart.push(result);
            }
        }
        //console.log($scope.cart);
        $localStorage.storeObject('cart', $scope.cart);
        
        for(var i = 0; i < $scope.cart.length; i++) {
            $scope.cartTotal += $scope.cart[i].totalPrice;
        }
    }]);