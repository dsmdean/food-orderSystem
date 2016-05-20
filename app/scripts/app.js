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
            templateUrl : 'views/front/header.html',
            controller  : 'HeaderCtrl'
          },
          'subheader': {
            templateUrl : 'views/front/subheader.html',
            controller  : 'SubheaderCtrl'
          },
          'content': {
            templateUrl : 'views/front/home.html',
            controller  : 'HomeCtrl'
          },
          'footer': {
            templateUrl : 'views/front/footer.html'
          }
        }
      })
      
      // route for the aboutus page
      .state('app.aboutus', {
        url:'aboutus',
        views: {
          'content@': {
            templateUrl : 'views/front/aboutus.html'                 
          }
        }
      })
      
      // route for the contactus page
      .state('app.contactus', {
        url:'contactus',
        views: {
          'content@': {
            templateUrl : 'views/front/contactus.html'                 
          }
        }
      })
      ;
      
      $urlRouterProvider.otherwise('/');
  });
