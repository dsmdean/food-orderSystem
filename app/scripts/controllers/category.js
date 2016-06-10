'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('CategoryCtrl', ['$scope', 'categoryFactory', '$state', function ($scope, categoryFactory, $state) {

        categoryFactory.query(
            function (response) {
                $scope.categories = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
        
        $scope.deleteCategory = function(categoryId) {
            console.log('Delete category', categoryId);
            categoryFactory.delete({id: categoryId});
            $state.go($state.current, {}, {reload: true});
        };
    }]);
