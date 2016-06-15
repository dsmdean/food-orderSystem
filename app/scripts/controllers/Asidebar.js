'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('ASidebarCtrl', ['$scope', '$state', '$localStorage', function ($scope, $state, $localStorage) {
        $scope.admin = false;

        $scope.stateis = function(curstate) {
            return $state.is(curstate);  
        };

        $scope.localstorage = $localStorage.getObject('Token','{}');

        if('admin' in $scope.localstorage) {
            $scope.admin = true;
        }
        
    }]);
