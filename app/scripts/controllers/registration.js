'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('RegisterCtrl', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', '$rootScope', '$state', function ($scope, ngDialog, $localStorage, AuthFactory, $rootScope, $state) {
        
        $scope.register={};
        $scope.loginData={};
        
        $scope.doRegister = function() {
            console.log('Doing registration', $scope.registration);

            AuthFactory.register($scope.registration);
            
            ngDialog.close();
        };
    }]);