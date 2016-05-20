'use strict';

/**
 * @ngdoc overview
 * @name orderSystemApp
 * @description
 * # orderSystemApp
 *
 * Main module of the application.
 */
angular
  .module('orderSystemApp', ['ui.router','ngResource','ngDialog'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    
      // route for the home page
      .state('app', {
        url:'/',
        views: {
          'header': {
            templateUrl : 'views/header.html',
            controller  : 'HeaderCtrl'
          },
          'subheader': {
            templateUrl : 'views/subheader.html'
          },
          'content': {
            templateUrl : 'views/home.html',
            controller  : 'HomeCtrl'
          },
          'footer': {
            templateUrl : 'views/footer.html'
          }
        }
      })
      
      // route for the aboutus page
      .state('app.aboutus', {
        url:'aboutus',
        views: {
          'content@': {
            templateUrl : 'views/aboutus.html'                 
          }
        }
      })
      ;
      
      $urlRouterProvider.otherwise('/');
  });
