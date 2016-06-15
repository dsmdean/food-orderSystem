'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('CompaniesMenuCtrl', ['$scope', 'companyFactory', 'companyCategoryDishesFactory', 'dishesCategoryFactory', '$state', '$stateParams', function ($scope, companyFactory, companyCategoryDishesFactory, dishesCategoryFactory, $state, $stateParams) {
        $scope.tabId = '';
        $scope.dishcategory = '';

        $scope.company = companyFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.company = response;
                if($scope.tabId == '') {
                    $scope.tabId = response.dishCategories[0]._id;
                }

                $scope.getDishes();
                $scope.getDishCategory();
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
        
        $scope.getDishes = function() {
            companyCategoryDishesFactory.query({
                id: $stateParams.id,
                categoryId: $scope.tabId
            })
            .$promise.then(
                function (response) {
                    $scope.dishes = response;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
        } 

        $scope.getDishCategory = function() {
            dishesCategoryFactory.get({
                id: $stateParams.id,
                detailId: $scope.tabId
            })
            .$promise.then(
                function (response) {
                    $scope.dishcategory = response;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
        }

        $scope.select = function (setTab) {
            $scope.tabId = setTab;
            $scope.getDishes();
            $scope.getDishCategory();
        };

        $scope.selected = function (setTab) {
            if(setTab == $scope.tabId) {
                return true;
            } else {
                return false;
            }
        };
    }]);
