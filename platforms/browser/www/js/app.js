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

    // Main state, loads menu template
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    // Display chart 1 state
    .state('app.chart-1', {
        url: '/chart-1',
        views: {
            'menuContent': {
                templateUrl: 'templates/chart-1.html',
                controller: 'ChartCtrl1'
            }
        }
    })

    // Display chart 2 state
    .state('app.chart-2', {
        url: '/chart-2',
        views: {
            'menuContent': {
                templateUrl: 'templates/chart-2.html',
                controller: 'ChartCtrl2'
            }
        }
    })
    
    // Dataset 1 state
    .state('app.dataset-1', {
        url: '/dataset-1',
        views: {
            'menuContent': {
                templateUrl: 'templates/dataset-1.html',
                controller: 'DataSetCtrl1'
            }
        }
    })
    
    // Dataset 2 state
    .state('app.dataset-2', {
        url: '/dataset-2',
        views: {
            'menuContent': {
                templateUrl: 'templates/dataset-2.html',
                controller: 'DataSetCtrl2'
            }
        }
    })

    // If state unknown, load chart 1 state
    $urlRouterProvider.otherwise('/app/dataset-1');

});