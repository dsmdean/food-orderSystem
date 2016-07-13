'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('CartCtrl', ['$scope', '$localStorage', 'AuthFactory', 'userFactory', 'ordersFactory', '$rootScope', '$state', 'ngDialog', function ($scope, $localStorage, AuthFactory, userFactory, ordersFactory, $rootScope, $state, ngDialog) {
        // $scope.cart = $localStorage.getObject('cart','{}');
        $scope.loggedIn = false;
        $scope.cart = [];
        $scope.cartTotal = 0;

        $scope.goToCheckout = false;
        
        $scope.loginData = $localStorage.getObject('userinfo','{}');
        $scope.localstorage = '';

        for(var i = 0, len = localStorage.length; i < len; i++) {
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

        if(AuthFactory.isAuthenticated()) {
            $scope.loggedIn = true;
            $scope.localstorage = $localStorage.getObject('Token','{}');
            
        }

        $rootScope.$on('login:Successful', function () {
            $scope.loggedIn = AuthFactory.isAuthenticated();
            $scope.localstorage = $localStorage.getObject('Token','{}');

            if($scope.goToCheckout) {
                $scope.checkout();
            }
        });

        $scope.checkout = function() {
            if(!$scope.loggedIn) {
                $scope.doLogin();

                $scope.goToCheckout = true;
            } else {
                $state.go("app.order-checkout");
            }
        }

        $scope.doLogin = function() {
            ngDialog.open({ template: 'views/front/login.html', scope: $scope, className: 'ngdialog-theme-plain', controller:"LoginCtrl" });
        };
    }]);