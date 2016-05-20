'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
  .controller('SubheaderCtrl', ['$scope', '$state', function ($scope, $state) {
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
  }]);
