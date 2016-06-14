'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('DishcategoryAddCtrl', ['$scope', 'dishesCategoryFactory', '$state', '$localStorage', function ($scope, dishesCategoryFactory, $state, $localStorage) {
        $scope.localstorage = $localStorage.getObject('Token','{}');
        
        $scope.cName = {
            name: ""
        };
        
        $scope.addCategory = function() {
            console.log($scope.cName);
            dishesCategoryFactory.save({id: $scope.localstorage.companyId}, $scope.cName);
            $state.go('app.admin-dishcategory');
        };
    }]);