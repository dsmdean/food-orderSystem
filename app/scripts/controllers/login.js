'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('LoginCtrl', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', '$rootScope', '$state', function ($scope, ngDialog, $localStorage, AuthFactory, $rootScope, $state) {
        
        $scope.loggedIn = false;
        $scope.username = '';
        $scope.userId = '';
        
        $scope.loginData = $localStorage.getObject('userinfo','{}');
        
        $scope.doLogin = function() {
            if($scope.rememberMe)
            $localStorage.storeObject('userinfo',$scope.loginData);

            AuthFactory.login($scope.loginData);

            ngDialog.close();
        };

        $scope.openRegister = function () {
            ngDialog.open({ template: 'views/front/register.html', scope: $scope, className: 'ngdialog-theme-plain', controller:"RegisterCtrl" });
        };
        
        if(AuthFactory.isAuthenticated()) {
            $scope.loggedIn = true;
            $scope.username = AuthFactory.getUsername();
            $scope.userId = AuthFactory.getUserId();
        }
        
        $rootScope.$on('login:Successful', function () {
            $scope.loggedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
            $scope.userId = AuthFactory.getUserId();
            
            $scope.localstorage = $localStorage.getObject('Token','{}');
            
            // if(!('companyId' in $scope.localstorage) && !('admin' in $scope.localstorage)) {
            //     $state.go('app.profile');
            // }
        });
        
        $scope.logOut = function() {
            AuthFactory.logout();
            $scope.loggedIn = false;
            $scope.username = '';
            $scope.userId = '';
        };
    }]);