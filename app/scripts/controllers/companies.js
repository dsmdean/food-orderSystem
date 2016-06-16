'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('CompaniesCtrl', ['$scope', 'companyFactory', 'categoryFactory', 'companyCategoryFactory', function ($scope, companyFactory, categoryFactory, companyCategoryFactory) {
        $scope.categoryId = '';

        categoryFactory.query(
            function (response) {
                $scope.categories = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        $scope.getData = function () {
            if($scope.categoryId == '') {
                companyFactory.query(
                    function (response) {
                        $scope.companies = response;

                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );
            } else {
                companyCategoryFactory.query({
                    id: $scope.categoryId
                })
                .$promise.then(
                    function (response) {
                        $scope.companies = response;
                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );
            }
        };

        $scope.select = function (setCat) {
            $scope.categoryId = setCat;
            $scope.getData();
        };

        $scope.getData();
 
    }]);
