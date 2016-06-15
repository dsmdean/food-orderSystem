'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('ANavbarCtrl', ['$scope', '$localStorage', 'AuthFactory', 'companyFactory', 'userFactory', '$rootScope', '$state', function ($scope, $localStorage, AuthFactory, companyFactory, userFactory, $rootScope, $state) {
        
        $scope.loggedIn = false;
        $scope.username = '';
        $scope.userId = '';
        $scope.companyB = false;
        $scope.adminB = false;
        
        $scope.loginData = $localStorage.getObject('userinfo','{}');
        $scope.localstorage = $localStorage.getObject('Token','{}');
        
        if(AuthFactory.isAuthenticated()) {
            $scope.loggedIn = true;
            $scope.username = AuthFactory.getUsername();
            $scope.userId = AuthFactory.getUserId();
            
            $scope.localstorage = $localStorage.getObject('Token','{}');
            
            if(!('companyId' in $scope.localstorage) && !('admin' in $scope.localstorage)) {
                $state.go('app', {}, {reload: true});
            }
        } else {
            $state.go('app.admin-dashboard', {}, {reload: true});
        }
        
        if('companyId' in $scope.localstorage) {
            $scope.companyB = true;
            
            $scope.company = companyFactory.get({
                id: $scope.localstorage.companyId
            })
            .$promise.then(
                function (response) {
                    $scope.company = response;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
        } else if('admin' in $scope.localstorage) {
            $scope.adminB = true;
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
        
        
        
        // $rootScope.$on('login:Successful', function () {
        //     $scope.loggedIn = AuthFactory.isAuthenticated();
        //     $scope.username = AuthFactory.getUsername();
        //     $scope.user = AuthFactory.getUser();
            
        //     if($scope.user.company) {
        //         $scope.company = true;
        //     }
            
        //     if(!$scope.user.company) {
        //         $state.go('app');
        //     }
        // });
        
        $scope.logOut = function() {
            AuthFactory.logout();
            $scope.loggedIn = false;
            $scope.username = '';
            $scope.userId = '';
            $state.go('app.admin-dashboard', {}, {reload: true});
        };
        
    }]);
