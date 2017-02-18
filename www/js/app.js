var urlapi = "http://localhost:3000/api/";


angular.module('app', [
    'ionic',
    'pascalprecht.translate',
    'app.menu',
    'app.main',
    'app.events',
    'app.event',
    'app.users',
    'app.user'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'MenuCtrl'
    })

    .state('app.main', {
      url: '/main',
      views: {
        'menuContent': {
          templateUrl: 'templates/main.html',
          controller: 'MainCtrl'
        }
      }
    })
    .state('app.events', {
      url: '/events',
      views: {
        'menuContent': {
          templateUrl: 'templates/events.html',
          controller: 'EventsCtrl'
        }
      }
    })
    .state('app.event', {
      url: '/events/:eventid',
      views: {
        'menuContent': {
          templateUrl: 'templates/event.html',
          controller: 'EventCtrl'
        }
      }
    })
    .state('app.users', {
      url: '/users',
      views: {
        'menuContent': {
          templateUrl: 'templates/users.html',
          controller: 'UsersCtrl'
        }
      }
    })
    .state('app.user', {
      url: '/users/:userid',
      views: {
        'menuContent': {
          templateUrl: 'templates/user.html',
          controller: 'UserCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/events');
})
  /* translator */
  .config(['$translateProvider', function($translateProvider) {

    /* get lang from the file translations.js */
    for (lang in translations) {
      $translateProvider.translations(lang, translations[lang]);
    }

    if (window.localStorage.getItem('lang')) {
      $translateProvider.preferredLanguage(window.localStorage.getItem('lang'));
    } else {
      $translateProvider.preferredLanguage('english');
    };

    $translateProvider.useSanitizeValueStrategy('escape');

  }])
  .factory('httpInterceptor', function httpInterceptor($q, $window, $location) {
    return {
      request: function(config) {
        return config;
      },
      requestError: function(config) {
        return config;
      },
      response: function(res) {
        return res;
      },
      responseError: function(res) {
        return res;
      }
    }
  })
  .factory('api', function($http) {
    return {
      init: function() {
        $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem("cim_app_token");
        $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem("cim_app_token");
      }
    };
  })
  .run(function(api) {
    api.init();
  });