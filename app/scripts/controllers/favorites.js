'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('FavoritesCtrl', ['$scope', '$state', '$localStorage', 'userFavoritesFactory', function ($scope, $state, $localStorage, userFavoritesFactory) {
        $scope.localstorage = $localStorage.getObject('Token','{}');

        userFavoritesFactory.query({
            id: $scope.localstorage.id
        })
        .$promise.then(
            function (response) {
                $scope.favorites = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        $scope.deleteFavorite = function (favoriteId) {
            userFavoritesFactory.delete({id: $scope.localstorage.id, favoriteId: favoriteId});

            $state.go($state.current, {}, {reload: true});
        };
    }]);
