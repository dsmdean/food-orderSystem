'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('HeaderCtrl', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', 'companyFactory', 'userFactory', '$rootScope', '$state', function ($scope, ngDialog, $localStorage, AuthFactory, companyFactory, userFactory, $rootScope, $state) {
        
        $scope.loggedIn = false;
        $scope.username = '';
        $scope.userId = '';
        $scope.user = '';
        $scope.company = false;
        $scope.companyD = '';
        $scope.admin = false;
        $scope.cartTotal = 0;

        // if(Object.keys($localStorage.getObject('totalCart','{}')).length == 0) {
        //     $scope.cartTotal = 0;
        // } else {
        //     var total = $localStorage.getObject('totalCart','{}');
        //     $scope.cartTotal = total.total;
        // }
        
        $scope.loginData = $localStorage.getObject('userinfo','{}');
        
        $scope.doLogin = function() {
            ngDialog.open({ template: 'views/front/login.html', scope: $scope, className: 'ngdialog-theme-plain', controller:"LoginCtrl" });
            // if($scope.rememberMe)
            // $localStorage.storeObject('userinfo',$scope.loginData);

            // AuthFactory.login($scope.loginData);
        };
        
        if(AuthFactory.isAuthenticated()) {
            $scope.loggedIn = true;
            $scope.username = AuthFactory.getUsername();
            $scope.userId = AuthFactory.getUserId();
            
            $scope.localstorage = $localStorage.getObject('Token','{}');
            
            if('companyId' in $scope.localstorage) {
                $scope.company = true;
                
                $scope.companyD = companyFactory.get({
                    id: $scope.localstorage.companyId
                })
                .$promise.then(
                    function (response) {
                        $scope.companyD = response;
                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );
            } else if('admin' in $scope.localstorage) {
                $scope.admin = true;

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
            } else {
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
            }
        }
        
        $rootScope.$on('login:Successful', function () {
            $scope.loggedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
            $scope.userId = AuthFactory.getUserId();
            
            $scope.localstorage = $localStorage.getObject('Token','{}');
            
            if('companyId' in $scope.localstorage) {
                $scope.company = true;
                
                $scope.companyD = companyFactory.get({
                    id: $scope.localstorage.companyId
                })
                .$promise.then(
                    function (response) {
                        $scope.companyD = response;
                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );
            } else if('admin' in $scope.localstorage) {
                $scope.admin = true;

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
            } else {
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
            }
        });

        $rootScope.$on('cart:Edit', function () {
            // var total = $localStorage.getObject('totalCart','{}');
            // $scope.cartTotal = total.total;
            // //console.log(total);
            $scope.cartTotal = 0;

            for ( var i = 0, len = localStorage.length; i < len; i++ ) {
                var key = localStorage.key(i);
                var json = localStorage.getItem(key);
                var result = JSON.parse(json);

                if(key.indexOf('cart_') === 0) {
                    $scope.cartTotal += result.details.length;
                }
            }
        });
        
        $scope.logOut = function() {
            AuthFactory.logout();
            $scope.loggedIn = false;
            $scope.username = '';
            $scope.userId = '';
            $scope.user = '';
            $scope.company = false;
            $scope.companyD = '';

            $state.go('app', {}, {reload: true});
        };
    }]);