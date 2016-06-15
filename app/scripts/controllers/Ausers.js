'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('AUsersCtrl', ['$scope', 'userFactory', function ($scope, userFactory) {

        userFactory.query(
            function (response) {
                $scope.users = response;

            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        $scope.suspendUser = function(userId) {
            console.log('Suspend User', userId);
        };
    }]);
