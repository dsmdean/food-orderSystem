'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('DishcategoryDetailsCtrl', ['$scope', 'dishesCategoryFactory', '$stateParams', '$state', '$localStorage', function ($scope, dishesCategoryFactory, $stateParams, $state, $localStorage) {
        $scope.localstorage = $localStorage.getObject('Token','{}');
        
        $scope.categoryName = {
            name: ""
        };
        
        $scope.category = dishesCategoryFactory.get({
            id: $scope.localstorage.companyId,
            detailId: $stateParams.id
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
            dishesCategoryFactory.update({id: $scope.localstorage.companyId, detailId: $stateParams.id}, $scope.categoryName);
            $state.go('app.admin-dishcategory');
        };
    }]);