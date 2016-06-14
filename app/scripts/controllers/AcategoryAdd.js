'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('CategoryAddCtrl', ['$scope', 'categoryFactory', '$state', function ($scope, categoryFactory, $state) {
        
        $scope.cName = {
            name: ""
        };
        
        $scope.addCategory = function() {
            console.log($scope.cName);
            categoryFactory.save($scope.cName);
            $state.go('app.admin-category');
        };
    }]);