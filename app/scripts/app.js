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
            templateUrl : 'views/front/products.html',
            controller  : 'ProductsCtrl'                 
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
            templateUrl : 'views/front/companies.html',
            controller  : 'CompaniesCtrl'                 
          }
        }
      })
      
      // route for the companies menu page
      .state('app.company-menu', {
        url:'companies/:id',
        views: {
          'content@': {
            templateUrl : 'views/front/company-menu.html',
            controller  : 'CompaniesMenuCtrl'                   
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
      .state('app.admin-dashboard', {
        url:'admin',
        views: {
          'header@': {
            templateUrl : 'views/admin/header.html'              
          },
          'content@': {
            templateUrl : 'views/admin/dashboard.html',
            controller  : 'LoginCtrl'                  
          },
          'footer@': {
            templateUrl : 'views/admin/footer.html'              
          },
          'Anavbar@app.admin-dashboard': {
            templateUrl : 'views/admin/Anavbar.html',
            controller  : 'ANavbarCtrl'                  
          },
          'Asidebar@app.admin-dashboard': {
            templateUrl : 'views/admin/Asidebar.html',
            controller  : 'ASidebarCtrl'              
          },
          'Afooter@app.admin-dashboard': {
            templateUrl : 'views/admin/Afooter.html'              
          }
        }
      })
      
      .state('app.admin-dashboard-', {
        url:'/',
        parent: 'app.admin-dashboard'
      })
      
      // route for the category page
      .state('app.admin-category', {
        url:'/category',
        parent: 'app.admin-dashboard',
        views: {
          'content@': {
            templateUrl : 'views/admin/category.html',
            controller  : 'CategoryCtrl'              
          },
          'Anavbar@app.admin-category': {
            templateUrl : 'views/admin/Anavbar.html',
            controller  : 'ANavbarCtrl'                       
          },
          'Asidebar@app.admin-category': {
            templateUrl : 'views/admin/Asidebar.html',
            controller  : 'ASidebarCtrl'                       
          },
          'Afooter@app.admin-category': {
            templateUrl : 'views/admin/Afooter.html'              
          }
        }
      })
      
      // route for the add category page
      .state('app.admin-category-add', {
        url:'/category/add',
        parent: 'app.admin-dashboard',
        views: {
          'content@': {
            templateUrl : 'views/admin/category-add.html',
            controller  : 'CategoryAddCtrl'              
          },
          'Anavbar@app.admin-category-add': {
            templateUrl : 'views/admin/Anavbar.html',
            controller  : 'ANavbarCtrl'                       
          },
          'Asidebar@app.admin-category-add': {
            templateUrl : 'views/admin/Asidebar.html',
            controller  : 'ASidebarCtrl'                       
          },
          'Afooter@app.admin-category-add': {
            templateUrl : 'views/admin/Afooter.html'              
          }
        }
      })
      
      // route for the category details page
      .state('app.admin-category-details', {
        url:'/category/:id',
        parent: 'app.admin-dashboard',
        views: {
          'content@': {
            templateUrl : 'views/admin/category-details.html',
            controller  : 'CategoryDetailsCtrl'              
          },
          'Anavbar@app.admin-category-details': {
            templateUrl : 'views/admin/Anavbar.html',
            controller  : 'ANavbarCtrl'                       
          },
          'Asidebar@app.admin-category-details': {
            templateUrl : 'views/admin/Asidebar.html',
            controller  : 'ASidebarCtrl'                       
          },
          'Afooter@app.admin-category-details': {
            templateUrl : 'views/admin/Afooter.html'              
          }
        }
      })
      
      // route for the category page
      .state('app.admin-dishcategory', {
        url:'/dishcategory',
        parent: 'app.admin-dashboard',
        views: {
          'content@': {
            templateUrl : 'views/admin/dishcategory.html',
            controller  : 'DishcategoryCtrl'              
          },
          'Anavbar@app.admin-dishcategory': {
            templateUrl : 'views/admin/Anavbar.html',
            controller  : 'ANavbarCtrl'                       
          },
          'Asidebar@app.admin-dishcategory': {
            templateUrl : 'views/admin/Asidebar.html',
            controller  : 'ASidebarCtrl'                       
          },
          'Afooter@app.admin-dishcategory': {
            templateUrl : 'views/admin/Afooter.html'              
          }
        }
      })
      
      // route for the add category page
      .state('app.admin-dishcategory-add', {
        url:'/dishcategory/add',
        parent: 'app.admin-dashboard',
        views: {
          'content@': {
            templateUrl : 'views/admin/dishcategory-add.html',
            controller  : 'DishcategoryAddCtrl'              
          },
          'Anavbar@app.admin-dishcategory-add': {
            templateUrl : 'views/admin/Anavbar.html',
            controller  : 'ANavbarCtrl'                       
          },
          'Asidebar@app.admin-dishcategory-add': {
            templateUrl : 'views/admin/Asidebar.html',
            controller  : 'ASidebarCtrl'                       
          },
          'Afooter@app.admin-dishcategory-add': {
            templateUrl : 'views/admin/Afooter.html'              
          }
        }
      })
      
      // route for the category details page
      .state('app.admin-dishcategory-details', {
        url:'/dishcategory/:id',
        parent: 'app.admin-dashboard',
        views: {
          'content@': {
            templateUrl : 'views/admin/dishcategory-details.html',
            controller  : 'DishcategoryDetailsCtrl'              
          },
          'Anavbar@app.admin-dishcategory-details': {
            templateUrl : 'views/admin/Anavbar.html',
            controller  : 'ANavbarCtrl'                       
          },
          'Asidebar@app.admin-dishcategory-details': {
            templateUrl : 'views/admin/Asidebar.html',
            controller  : 'ASidebarCtrl'                       
          },
          'Afooter@app.admin-dishcategory-details': {
            templateUrl : 'views/admin/Afooter.html'              
          }
        }
      })
      
      // route for the products page
      .state('app.admin-products', {
        url:'/products',
        parent: 'app.admin-dashboard',
        views: {
          'content@': {
            templateUrl : 'views/admin/products.html',
            controller  : 'AProductsCtrl'              
          },
          'Anavbar@app.admin-products': {
            templateUrl : 'views/admin/Anavbar.html',
            controller  : 'ANavbarCtrl'                       
          },
          'Asidebar@app.admin-products': {
            templateUrl : 'views/admin/Asidebar.html',
            controller  : 'ASidebarCtrl'                       
          },
          'Afooter@app.admin-products': {
            templateUrl : 'views/admin/Afooter.html'              
          }
        }
      })
      
      // route for the add product page
      .state('app.admin-product-add', {
        url:'/product-details/add',
        parent: 'app.admin-dashboard',
        views: {
          'content@': {
            templateUrl : 'views/admin/product-add.html',
            controller  : 'ProductAddCtrl'              
          },
          'Anavbar@app.admin-product-add': {
            templateUrl : 'views/admin/Anavbar.html',
            controller  : 'ANavbarCtrl'                       
          },
          'Asidebar@app.admin-product-add': {
            templateUrl : 'views/admin/Asidebar.html',
            controller  : 'ASidebarCtrl'                       
          },
          'Afooter@app.admin-product-add': {
            templateUrl : 'views/admin/Afooter.html'              
          }
        }
      })
      
      // route for the product details page
      .state('app.admin-product-details', {
        url:'/products/:id',
        parent: 'app.admin-dashboard',
        views: {
          'content@': {
            templateUrl : 'views/admin/product-details.html',
            controller  : 'ProductDetailsCtrl'              
          },
          'Anavbar@app.admin-product-details': {
            templateUrl : 'views/admin/Anavbar.html',
            controller  : 'ANavbarCtrl'                       
          },
          'Asidebar@app.admin-product-details': {
            templateUrl : 'views/admin/Asidebar.html',
            controller  : 'ASidebarCtrl'                       
          },
          'Afooter@app.admin-product-details': {
            templateUrl : 'views/admin/Afooter.html'              
          }
        }
      })
      
      // route for the profile page
      .state('app.admin-profile', {
        url:'/profile',
        parent: 'app.admin-dashboard',
        views: {
          'content@': {
            templateUrl : 'views/admin/profile.html'              
          },
          'Anavbar@app.admin-profile': {
            templateUrl : 'views/admin/Anavbar.html',
            controller  : 'ANavbarCtrl'                       
          },
          'Asidebar@app.admin-profile': {
            templateUrl : 'views/admin/Asidebar.html',
            controller  : 'ASidebarCtrl'                       
          },
          'Afooter@app.admin-profile': {
            templateUrl : 'views/admin/Afooter.html'              
          }
        }
      })
      
      // route for the orders page
      .state('app.admin-orders', {
        url:'/orders',
        parent: 'app.admin-dashboard',
        views: {
          'content@': {
            templateUrl : 'views/admin/orders.html'              
          },
          'Anavbar@app.admin-orders': {
            templateUrl : 'views/admin/Anavbar.html',
            controller  : 'ANavbarCtrl'                       
          },
          'Asidebar@app.admin-orders': {
            templateUrl : 'views/admin/Asidebar.html',
            controller  : 'ASidebarCtrl'                       
          },
          'Afooter@app.admin-orders': {
            templateUrl : 'views/admin/Afooter.html'              
          }
        }
      })
      
      // route for the order details page
      .state('app.admin-order-details', {
        url:'/order-details',
        parent: 'app.admin-dashboard',
        views: {
          'content@': {
            templateUrl : 'views/admin/order-details.html'              
          },
          'Anavbar@app.admin-order-details': {
            templateUrl : 'views/admin/Anavbar.html',
            controller  : 'ANavbarCtrl'                       
          },
          'Asidebar@app.admin-order-details': {
            templateUrl : 'views/admin/Asidebar.html',
            controller  : 'ASidebarCtrl'                       
          },
          'Afooter@app.admin-order-details': {
            templateUrl : 'views/admin/Afooter.html'              
          }
        }
      })
      ;
      
      // $urlRouterProvider.otherwise('/');
  });
