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
        $scope.overallR = 0;

        $scope.company = companyFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.company = response;
                // if($scope.tabId == '') {
                //     $scope.tabId = response.dishCategories[0]._id;
                // }

                $scope.getDishes();
                $scope.getDishCategory();
                $scope.overallRating(response.comments);
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

        $scope.hours = function(time) {
            var hours = Math.trunc(time/60);
            var minutes = time % 60;
            var min = "";
            var ap = "am";

            if(hours == 12) {
                ap = "pm";

            } else if(hours > 12) {
                if(hours == 24) {
                    ap = "am";
                    hours = 0;
                } else {
                    ap = "pm";
                    hours = hours - 12;
                }
            }

            if(minutes < 10) {
                min = "0" + minutes;
            } else {
                min = minutes;
            }

            return hours +":"+ min + ap;
        }

        $scope.overallRating = function (comments) {
            for (i = 0; i < comments.length; i++) { 
                $scope.overallR += comments[i].rating;
                console.log($scope.overallR);
            }
        };
    }]);
