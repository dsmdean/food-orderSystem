'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('CategoryDetailsCtrl', ['$scope', 'categoryFactory', '$stateParams', '$state', function ($scope, categoryFactory, $stateParams, $state) {
        $scope.categoryName = {
            name: ""
        };
        
        $scope.category = categoryFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.category = response;
                $scope.categoryName.name = response.name
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
        
        $scope.updateCategory = function() {
            console.log('Update category', $scope.categoryName.name);
            categoryFactory.update({id: $stateParams.id}, $scope.categoryName);
            $state.go('app.admin-category');
        };
    }]);