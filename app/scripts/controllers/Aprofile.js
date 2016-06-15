'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('AProfileCtrl', ['$scope', '$state', 'companyFactory', '$localStorage', function ($scope, $state, companyFactory, $localStorage) {
        
        $scope.localstorage = $localStorage.getObject('Token','{}');

        $scope.company = companyFactory.get({
            id: $scope.localstorage.companyId
        })
        .$promise.then(
            function (response) {
                $scope.company = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
        
    }]);
