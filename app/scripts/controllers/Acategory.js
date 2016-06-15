'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('CategoryCtrl', ['$scope', 'categoryFactory', 'AuthFactory', '$state', '$localStorage', function ($scope, categoryFactory, AuthFactory, $state, $localStorage) {
        
        // if(AuthFactory.isAuthenticated()) {
        //     $scope.localstorage = $localStorage.getObject('Token','{}');
            
        //     if(!('companyId' in $scope.localstorage)) {
        //         $state.go('app', {}, {reload: true});
        //     }
        // } else {
        //     $state.go('app.admin-dashboard', {}, {reload: true});
        // }

        $scope.localstorage = $localStorage.getObject('Token','{}');

        if(!('admin' in $scope.localstorage)) {
            $state.go('app.admin-dashboard', {}, {reload: true});
        }
        
        categoryFactory.query(
            function (response) {
                $scope.categories = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
        
        $scope.deleteCategory = function(categoryId) {
            console.log('Delete category', categoryId);
            categoryFactory.delete({id: categoryId});
            $state.go($state.current, {}, {reload: true});
        };
    }]);
