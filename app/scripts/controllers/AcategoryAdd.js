'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('CategoryAddCtrl', ['$scope', 'categoryFactory', '$state', '$localStorage', function ($scope, categoryFactory, $state, $localStorage) {
        
        $scope.localstorage = $localStorage.getObject('Token','{}');

        if(!('admin' in $scope.localstorage)) {
            $state.go('app.admin-dashboard', {}, {reload: true});
        }
        
        $scope.cName = {
            name: ""
        };
        
        $scope.addCategory = function() {
            console.log($scope.cName);
            categoryFactory.save($scope.cName);
            $state.go('app.admin-category');
        };
    }]);