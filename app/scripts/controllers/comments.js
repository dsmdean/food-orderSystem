'use strict';

/**
 * @ngdoc function
 * @name orderSystemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the orderSystemApp
 */
angular.module('orderSystemApp')
    .controller('CommentCtrl', ['$scope', 'companyCommentFactory', 'userFactory', '$state', '$stateParams', '$localStorage', 'ngDialog', function ($scope, companyCommentFactory, userFactory, $state, $stateParams, $localStorage, ngDialog) {
        $scope.localstorage = $localStorage.getObject('Token','{}');

        $scope.comment = {
            rating: "",
            comment: "",
            postedBy: ""
        }

        $scope.user = userFactory.get({
            id: $scope.localstorage.id
        })
        .$promise.then(
            function (response) {
                $scope.user = response;
                $scope.comment.postedBy = response._id;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        $scope.postComment = function() {
            companyCommentFactory.save({id: $stateParams.id}, $scope.comment);
            ngDialog.close();
            $state.go($state.current, {}, {reload: true});
        };
        
    }]);
