'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('CompaniesMenuCtrl', ['$scope', '$rootScope', 'AuthFactory', 'companyFactory', 'companyCategoryDishesFactory', 'dishesCategoryFactory', 'userFavoritesFactory', '$state', '$stateParams', '$localStorage', 'ngDialog', function ($scope, $rootScope, AuthFactory, companyFactory, companyCategoryDishesFactory, dishesCategoryFactory, userFavoritesFactory, $state, $stateParams, $localStorage, ngDialog) {
        $scope.tabId = '';
        $scope.dishcategory = '';
        $scope.overallR = 0;
        $scope.loggedIn = false;
        $scope.favorites = '';

        $scope.localstorage = '';

        $scope.company = companyFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.company = response;
                
                $scope.getDishes();
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
            }
        };

        $scope.openComment = function () {
            ngDialog.open({ template: 'views/front/comment.html', scope: $scope, className: 'ngdialog-theme-plain', controller:"CommentCtrl" });
        };

        if(AuthFactory.isAuthenticated()) {
            $scope.loggedIn = true;
            $scope.localstorage = $localStorage.getObject('Token','{}');
            
        }

        $rootScope.$on('login:Successful', function () {
            $scope.loggedIn = AuthFactory.isAuthenticated();
            $scope.localstorage = $localStorage.getObject('Token','{}');
            
        });

        $scope.addFavorite = function (companyId) {
            var companyId = {
                "company": companyId
            };
            userFavoritesFactory.save({id: $scope.localstorage.id}, companyId);

            $state.go('app.favorites', {}, {reload: true});
        };
    }]);
