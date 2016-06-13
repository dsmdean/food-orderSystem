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
        
        $scope.loginData = $localStorage.getObject('userinfo','{}');
        
        $scope.doLogin = function() {
            if($scope.rememberMe)
            $localStorage.storeObject('userinfo',$scope.loginData);

            AuthFactory.login($scope.loginData);
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
        
        $scope.logOut = function() {
            AuthFactory.logout();
            $scope.loggedIn = false;
            $scope.username = '';
            $scope.userId = '';
            $scope.user = '';
            $scope.company = false;
            $scope.companyD = '';
        };
    }]);