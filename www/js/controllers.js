angular.module('linked-data-project.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('DataSet1', function($scope, $ionicActionSheet, $ionicBackdrop, $http, $timeout) {

    /*$scope.show = function() {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
        buttons: [
            { text: '<b>Search</b>' },
            { text: '<b>Insert</b>' },
            { text: '<b>Update</b>' },
            { text: '<b>Delete</b>' }
        ],
        cancelText: '<b>Cancel<b>',
        cancel: function() {
            return false;
        },
        buttonClicked: function(index) {
            state = index;
            return true;
        }
    });

    $timeout(function() {
     hideSheet();
    }, 15000);

    };*/
    
    /*$scope.action = function() {
        $ionicBackdrop.retain();
        $timeout(function() {
          $ionicBackdrop.release();
        }, 1000);
    };*/
    
    /*$scope.doRefresh = function() {
        $http.get('http://localhost:8000')
        .success(function(newItems) {
        })
        .finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };*/
    
    $scope.getData = function(settings) {
        
        var searchID = settings.dataID;
        
        // If not a number then set searchID to 1
        if(isNaN(parseFloat(searchID)) && !isFinite(searchID)){
            searchID = 1;
        }
        
        // Cors must be enabled to use local resources, there is a plugin for chrome to enable cors
        $http.get('http://192.168.1.102:8000/get-d1/' + searchID).then(function(resp) {
            $scope.dataID = resp.data.ID;
            $scope.dataCountry = resp.data.Country;
            $scope.dataPollutant = resp.data.Pollutant;
            $scope.dataYear = resp.data.Year;
            $scope.dataValue = resp.data.Value;
        }, function(err) {
            alert('Error with DB');
        })
    };
})

.controller('DataSet2', function($scope, $ionicActionSheet, $http, $timeout) {
    
    /*$scope.show = function() {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
        buttons: [
            { text: '<b>Search</b>' },
            { text: '<b>Insert</b>' },
            { text: '<b>Update</b>' },
            { text: '<b>Delete</b>' }
        ],
        cancelText: '<b>Cancel<b>',
        cancel: function() {
            return false;
        },
        buttonClicked: function(index) {
            state = index;
            return true;
        }
    });

    $timeout(function() {
     hideSheet();
    }, 15000);

    };*/
    
    $scope.getData = function(settings) {
        
        var searchID = settings.dataID;
        
        // If not a number then set searchID to 1
        if(isNaN(parseFloat(searchID)) && !isFinite(searchID)){
            searchID = 1;
        }
        
        // Cors must be enabled to use local resources, there is a plugin for chrome to enable cors
        $http.get('http://192.168.1.102:8000/get-d2/' + searchID).then(function(resp) {
            $scope.dataID = resp.data.ID;
            $scope.dataTime = resp.data.Time;
            $scope.dataDemand = resp.data.Demand;
        }, function(err) {
            alert('Error with DB');
        })
    };
});