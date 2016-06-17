'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('ProfileEditCtrl', ['$scope', '$state', 'userFactory', 'AuthFactory', '$localStorage', function ($scope, $state, userFactory, AuthFactory, $localStorage) {
        $scope.localstorage = $localStorage.getObject('Token','{}');
        $scope.user = {
            username: "",
            firstname: "",
            lastname: "",
            email: ""
        }

        if(AuthFactory.isAuthenticated()) {
            $scope.user = userFactory.get({
                id: $scope.localstorage.id
            })
            .$promise.then(
                function (response) {
                    $scope.user = response;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
        }

        $scope.editProfile = function() {
            userFactory.update({id: $scope.localstorage.id}, $scope.user);
            $state.go('app.profile', {}, {reload: true});
        }
    }]);
