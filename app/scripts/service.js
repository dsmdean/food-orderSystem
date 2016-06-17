'use strict';

angular.module('orderSystemApp')
.constant("baseURL", "http://localhost:3000/")
.factory('companyFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "companies/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('companyDishesFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "companies/:id/dishes", {id:"@Id"}, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('companyCategoryFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "companies?categoryId=:id", {id:"@Id"}, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('companyCategoryDishesFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "companies/:id/dishes/:categoryId", {id:"@Id"}, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('companyCommentFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "companies/:id/comments/:commentId", {id:"@Id"}, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('companyOrdersFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "companies/:id/orders", {id:"@Id"}, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('ordersFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "orders/:id", {id:"@Id"}, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('dishesFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "dishes/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('dishesCategoryFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "companies/:id/dish-categories/:detailId", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('categoryFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "company-categories/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('userFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "users/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('userFavoritesFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "users/:id/favorites/:favoriteId", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('userOrdersFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "users/:id/orders", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('$localStorage', ['$window', function ($window) {
    return {
        store: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        },
        storeObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key, defaultValue) {
            return JSON.parse($window.localStorage[key] || defaultValue);
        }
    }
}])

.factory('AuthFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', function($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog){
    
    var authFac = {};
    var TOKEN_KEY = 'Token';
    var isAuthenticated = false;
    var username = '';
    var userId = '';
    var authToken = undefined;
    

  function loadUserCredentials() {
    var credentials = $localStorage.getObject(TOKEN_KEY,'{}');
    if (credentials.username != undefined) {
      useCredentials(credentials);
    }
  }
 
  function storeUserCredentials(credentials) {
    $localStorage.storeObject(TOKEN_KEY, credentials);
    useCredentials(credentials);
  }
 
  function useCredentials(credentials) {
    isAuthenticated = true;
    username = credentials.username;
    userId = credentials.id;
    authToken = credentials.token;
 
    // Set the token as header for your requests!
    $http.defaults.headers.common['x-access-token'] = authToken;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    userId = '';
    isAuthenticated = false;
    $http.defaults.headers.common['x-access-token'] = authToken;
    $localStorage.remove(TOKEN_KEY);
  }
     
    authFac.login = function(loginData) {
        
        $resource(baseURL + "users/login")
        .save(loginData,
           function(response) {
               if(response.user.company) {
                   $resource("http://localhost:3000/companies/user/" + response.user._id)
                   .get(
                       function(secondResponse) {
                           storeUserCredentials({id: response.user._id, username:loginData.username, token: response.token, companyId: secondResponse._id});
                           console.log("Succes getting company!");
                           $rootScope.$broadcast('login:Successful');
                       },
                       function(secondResponse) {
                           console.log("Error getting copany!");
                       }
                   );
               } else if(response.user.admin) {
                   storeUserCredentials({id: response.user._id, username:loginData.username, token: response.token, admin:response.user.admin});
                   $rootScope.$broadcast('login:Successful');
               } else {
                   storeUserCredentials({id: response.user._id, username:loginData.username, token: response.token});
                   $rootScope.$broadcast('login:Successful');
               }
              
            //   userId = response.user;
              
           },
           function(response){
              isAuthenticated = false;
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Login Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + '</p><p>' +
                    response.data.err.name + '</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>'
            
                ngDialog.openConfirm({ template: message, plain: 'true'});
           }
        
        );

    };
    
    authFac.logout = function() {
        $resource(baseURL + "users/logout").get(function(response){
        });
        destroyUserCredentials();
    };
    
    authFac.register = function(registerData) {
        
        $resource(baseURL + "users/register")
        .save(registerData,
           function(response) {
              authFac.login({username:registerData.username, password:registerData.password});
            if (registerData.rememberMe) {
                $localStorage.storeObject('userinfo',
                    {username:registerData.username, password:registerData.password});
            }
           
              $rootScope.$broadcast('registration:Successful');
           },
           function(response){
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Registration Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + 
                  '</p><p>' + response.data.err.name + '</p></div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});

           }
        
        );
    };
    
    authFac.isAuthenticated = function() {
        return isAuthenticated;
    };
    
    authFac.getUsername = function() {
        return username;  
    };
    
    authFac.getUserId = function() {
        return userId;  
    };

    loadUserCredentials();
    
    return authFac;
    
}])
;