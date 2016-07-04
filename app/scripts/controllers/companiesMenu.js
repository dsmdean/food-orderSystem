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
        $scope.cart = {
            products: [],
            total: 0
        };

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

        $scope.addToCart = function(name, price) {
            var inArray = [false, 0];

            for(var i = 0; i < $scope.cart.products.length; i++) {
                if($scope.cart.products[i].dishName == name) {
                    inArray = [true, i];
                };
            }

            if(!inArray[0]) {
                $scope.cart.products.push({
                    dishName: name,
                    quantity: 1,
                    price: price,
                    subtotal: price
                });
            } else {
                $scope.cart.products[inArray[1]].quantity ++;
                $scope.cart.products[inArray[1]].subtotal = $scope.cart.products[inArray[1]].quantity * $scope.cart.products[inArray[1]].price;
            }

            $scope.cartTotal();
        }

        $scope.plusQuantity = function(index) {
            $scope.cart.products[index].quantity ++;
            $scope.cart.products[index].subtotal = $scope.cart.products[index].quantity * $scope.cart.products[index].price;

            $scope.cartTotal();
        }

        $scope.minQuantity = function(index) {
            $scope.cart.products[index].quantity --;
            $scope.cart.products[index].subtotal = $scope.cart.products[index].quantity * $scope.cart.products[index].price;

            if($scope.cart.products[index].quantity == 0) {
                $scope.cart.products.splice(index, 1);
            }

            $scope.cartTotal();
        }

        $scope.cartTotal = function() {
            var total = 0;
            for(var i = 0; i < $scope.cart.products.length; i++) {
                total += $scope.cart.products[i].subtotal;
            }

            $scope.cart.total = total;
        }

        $scope.checkout = function() {
            $localStorage.storeObject('cart', $scope.cart);
            $state.go("app.order-checkout");
        }
    }]);
