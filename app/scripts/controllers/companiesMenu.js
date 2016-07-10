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

        $scope.goToCheckout = false;
        
        $scope.loginData = $localStorage.getObject('userinfo','{}');
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

            if($scope.goToCheckout) {
                $scope.checkout();
            }
        });

        $scope.addFavorite = function (companyId) {
            var companyId = {
                "company": companyId
            };
            userFavoritesFactory.save({id: $scope.localstorage.id}, companyId);

            $state.go('app.favorites', {}, {reload: true});
        };

        if(Object.keys($localStorage.getObject('cart_' + $stateParams.id,'{}')).length == 0) {
            $scope.cart = {
                details: [],
                totalPrice: 0
            };
        } else {
            $scope.cart = $localStorage.getObject('cart_' + $stateParams.id,'{}');
        }

        // if(Object.keys($localStorage.getObject('totalCart','{}')).length == 0) {
        //     $scope.totalCart = {total: 0};
        //     // console.log($scope.totalCart);
        // } else {
        //     $scope.totalCart = $localStorage.getObject('totalCart','{}');
        // }
        // // console.log($scope.totalCart);

        $scope.addToCart = function(id, name, price) {
            var inArray = [false, 0];

            for(var i = 0; i < $scope.cart.details.length; i++) {
                if($scope.cart.details[i].dishName == name) {
                    inArray = [true, i];
                };
            }

            if(!inArray[0]) {
                $scope.cart.details.push({
                    dishId: id,
                    dishName: name,
                    quantity: 1,
                    price: price,
                    SubTotalPrice: price
                });
            } else {
                $scope.cart.details[inArray[1]].quantity ++;
                $scope.cart.details[inArray[1]].SubTotalPrice = $scope.cart.details[inArray[1]].quantity * $scope.cart.details[inArray[1]].price;
            }

            $scope.cartTotal();
            $scope.cart.companyId = $scope.company._id;
            $scope.cart.companyName = $scope.company.name;
            $localStorage.storeObject('cart_' + $scope.company._id, $scope.cart);
            // var total = $scope.totalCart.total ++;
            // $localStorage.storeObject('totalCart', {total: total});
            $rootScope.$broadcast('cart:Edit');
        }

        $scope.plusQuantity = function(index) {
            $scope.cart.details[index].quantity ++;
            $scope.cart.details[index].SubTotalPrice = $scope.cart.details[index].quantity * $scope.cart.details[index].price;

            $scope.cartTotal();
            $localStorage.storeObject('cart_' + $scope.company._id, $scope.cart);
            $rootScope.$broadcast('cart:Edit');
        }

        $scope.minQuantity = function(index) {
            $scope.cart.details[index].quantity --;
            $scope.cart.details[index].SubTotalPrice = $scope.cart.details[index].quantity * $scope.cart.details[index].price;

            if($scope.cart.details[index].quantity == 0) {
                $scope.cart.details.splice(index, 1);
                // var total = $scope.totalCart.total --;
                // $localStorage.storeObject('totalCart', {total: total});
            }

            $scope.cartTotal();
            $localStorage.storeObject('cart_' + $scope.company._id, $scope.cart);
            $rootScope.$broadcast('cart:Edit');
        }

        $scope.cartTotal = function() {
            var total = 0;
            for(var i = 0; i < $scope.cart.details.length; i++) {
                total += $scope.cart.details[i].SubTotalPrice;
            }

            $scope.cart.totalPrice = total;
        }

        $scope.checkout = function() {
            if(!$scope.loggedIn) {
                $scope.doLogin();

                $scope.goToCheckout = true;
            } else {
                $scope.cart.companyId = $scope.company._id;
                $scope.cart.userId = $scope.localstorage.id;
                $localStorage.storeObject('cart_' + $scope.company._id, $scope.cart);
                $rootScope.$broadcast('cart:Edit');
                $state.go("app.order-checkout");
            }
        }

        $scope.doLogin = function() {
            ngDialog.open({ template: 'views/front/login.html', scope: $scope, className: 'ngdialog-theme-plain', controller:"LoginCtrl" });
        };
    }]);
