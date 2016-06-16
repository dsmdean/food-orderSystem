'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('CompaniesCtrl', ['$scope', 'companyFactory', 'categoryFactory', function ($scope, companyFactory, categoryFactory) {
        $scope.tabId = '';
        $scope.categoryId = '';

        companyFactory.query(
            function (response) {
                $scope.companies = response;

            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        categoryFactory.query(
            function (response) {
                $scope.categories = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

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
