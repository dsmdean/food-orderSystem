'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('ACompaniesCtrl', ['$scope', 'companyFactory', function ($scope, companyFactory) {

        companyFactory.query(
            function (response) {
                $scope.companies = response;

            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        $scope.suspendCompany = function(companyId) {
            console.log('Suspend Company', companyId);
        };
    }]);
