angular.module('linked-data-project.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ChartlistsCtrl', function($scope) {
  $scope.chartlists = [
    { title: 'Chart 1', id: 1 },
    { title: 'Chart 2', id: 2 },
    { title: 'Chart 3', id: 3 },
    { title: 'Chart 4', id: 4 },
    { title: 'Chart 5', id: 5 },
    { title: 'Chart 6', id: 6 }
  ];
})

.controller('ChartlistCtrl', function($scope, $stateParams) {
});