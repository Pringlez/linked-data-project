// Ionic App - linked-data-project
angular.module('linked-data-project', ['ionic', 'linked-data-project.controllers', 'linked-data-project.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.chart-1', {
    url: '/chart-1',
    views: {
      'menuContent': {
        templateUrl: 'templates/chart-1.html'
      }
    }
  })

  .state('app.chart-2', {
      url: '/chart-2',
      views: {
        'menuContent': {
          templateUrl: 'templates/chart-2.html'
        }
      }
    })
    .state('app.chartlists', {
      url: '/chartlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/chartlists.html',
          controller: 'ChartlistsCtrl'
        }
      }
    })

  .state('app.chart', {
    url: '/chartlists/:chartlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/chartlist.html',
        controller: 'ChartlistCtrl'
      }
    }
  });

    $urlRouterProvider.otherwise('/app/chart-1');

});