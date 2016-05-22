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
      
      // route for the contactus page
      .state('app.faq', {
        url:'faq',
        views: {
          'content@': {
            templateUrl : 'views/front/faq.html'                 
          }
        }
      })
      
      // route for the products page
      .state('app.products', {
        url:'products',
        views: {
          'content@': {
            templateUrl : 'views/front/products.html'                 
          }
        }
      })
      
      // route for the favorites page
      .state('app.favorites', {
        url:'favorites',
        views: {
          'content@': {
            templateUrl : 'views/front/favorites.html'                 
          }
        }
      })
      
      // route for the profile page
      .state('app.profile', {
        url:'profile',
        views: {
          'content@': {
            templateUrl : 'views/front/profile.html'                 
          }
        }
      })
      
      // route for the companies page
      .state('app.companies', {
        url:'companies',
        views: {
          'content@': {
            templateUrl : 'views/front/companies.html'                 
          }
        }
      })
      
      // route for the companies menu page
      .state('app.company-menu', {
        url:'company-menu',
        views: {
          'content@': {
            templateUrl : 'views/front/company-menu.html'                 
          }
        }
      })
      
      // route for the companies profile page
      .state('app.company-profile', {
        url:'company-profile',
        views: {
          'content@': {
            templateUrl : 'views/front/company-profile.html'                 
          }
        }
      })
      
      // route for the order details page
      .state('app.order-details', {
        url:'order-details',
        views: {
          'content@': {
            templateUrl : 'views/front/order-details.html'                 
          }
        }
      })
      
      // route for the order details page
      .state('app.order-checkout', {
        url:'order-checkout',
        views: {
          'content@': {
            templateUrl : 'views/front/order-checkout.html'                 
          }
        }
      })
      
      // route for the order details page
      .state('app.order-finish', {
        url:'order-finish',
        views: {
          'content@': {
            templateUrl : 'views/front/order-finish.html'                 
          }
        }
      })
      
      
      // route for the dashboard page
      .state('adminApp', {
        url:'/admin/',
        views: {
          'header@': {
            templateUrl : ''
          },
          'subheader@': {
            templateUrl : ''
          },
          'content@': {
            templateUrl : 'views/admin/dashboard.html'
          },
          'footer@': {
            templateUrl : ''
          }
        }
      })
      
      // route for the category page
      .state('adminApp.category', {
        url:'/admin/category',
        views: {
          'content@': {
            templateUrl : ''                 
          }
        }
      })
      
      // route for the category details page
      .state('adminApp.category-details', {
        url:'/admin/category-details',
        views: {
          'content@': {
            templateUrl : ''                 
          }
        }
      })
      
      // route for the products page
      .state('adminApp.products', {
        url:'/admin/products',
        views: {
          'content@': {
            templateUrl : ''                 
          }
        }
      })
      
      // route for the product details page
      .state('adminApp.product-details', {
        url:'/admin/product-details',
        views: {
          'content@': {
            templateUrl : ''                 
          }
        }
      })
      
      // route for the profile page
      .state('adminApp.profile', {
        url:'/admin/profile',
        views: {
          'content@': {
            templateUrl : ''                 
          }
        }
      })
      
      // route for the orders page
      .state('adminApp.orders', {
        url:'/admin/orders',
        views: {
          'content@': {
            templateUrl : ''                 
          }
        }
      })
      
      // route for the order details page
      .state('adminApp.order-details', {
        url:'/admin/order-details',
        views: {
          'content@': {
            templateUrl : ''                 
          }
        }
      })
      ;
      
      $urlRouterProvider.otherwise('/');
  });
