'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('DishcategoryCtrl', ['$scope', 'dishesCategoryFactory', '$state', '$localStorage', function ($scope, dishesCategoryFactory, $state, $localStorage) {
        $scope.localstorage = $localStorage.getObject('Token','{}');
        
        dishesCategoryFactory.query({
            id: $scope.localstorage.companyId
        })
        .$promise.then(
            function (response) {
                $scope.categories = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
        
        $scope.deleteCategory = function(categoryId) {
            console.log('Delete category', categoryId);
            dishesCategoryFactory.delete({id: $scope.localstorage.companyId, detailId: categoryId});
            $state.go($state.current, {}, {reload: true});
        };
    }]);
