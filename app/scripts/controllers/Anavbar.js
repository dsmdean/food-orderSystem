'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('ANavbarCtrl', ['$scope', '$localStorage', 'AuthFactory', 'companyFactory', '$rootScope', '$state', function ($scope, $localStorage, AuthFactory, companyFactory, $rootScope, $state) {
        
        $scope.loggedIn = false;
        $scope.username = '';
        $scope.userId = '';
        
        $scope.loginData = $localStorage.getObject('userinfo','{}');
        $scope.localstorage = $localStorage.getObject('Token','{}');
        
        if(AuthFactory.isAuthenticated()) {
            $scope.loggedIn = true;
            $scope.username = AuthFactory.getUsername();
            $scope.userId = AuthFactory.getUserId();
        }
        
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
