angular.module('linked-data-project.controllers', [])

.controller('AppCtrl', function($scope, $timeout) {
})

.controller('ChartCtrl1', function($scope, $timeout, PouchdbService) {
    $scope.render = function() {
        PouchdbService.getGreenhouseGases().then(function(chartdata){
            var html = '<h3 style="margin-left: 100px; margin-top: 10px;">Greenhouse Gases</h3><figure style="width: 450px; height: 500px;" id="gaschart1"></figure>';
            $("#content1").html(html);
            new xChart('line-dotted', chartdata, '#gaschart1', chartdata.options);
        });
    }
})

.controller('ChartCtrl2', function($scope, $timeout, PouchdbService) {
    $scope.render = function() {
        PouchdbService.getCarbonDioxide().then(function(chartdata){
            var html = '<h3 style="margin-left: 100px; margin-top: 10px;">Carbon Dioxide</h3><figure style="width: 450px; height: 500px;" id="gaschart2"></figure>';
            $("#content2").html(html);
            new xChart('line-dotted', chartdata, '#gaschart2', chartdata.options);
        });
    }
})

.controller('ChartCtrl3', function($scope, $timeout, PouchdbService) {
    $scope.render = function() {
        PouchdbService.getMethane().then(function(chartdata){
            var html = '<h3 style="margin-left: 100px; margin-top: 10px;">Methane</h3><figure style="width: 450px; height: 500px;" id="gaschart3"></figure>';
            $("#content3").html(html);
            new xChart('line-dotted', chartdata, '#gaschart3', chartdata.options);
        });
    }
})

.controller('DataSetCtrl1', function($scope, $http, $ionicPopup, $timeout) {
    
    // Connection details
    var ip = 'localhost';
    var port = '11000';
    
    // Data binding object
    $scope.form = {
        'id' : '',
        'country' : '',
        'pollutant' : '',
        'year' : '',
        'value' : ''
    };
    
    // Search by id function
    $scope.searchByID = function() {
        
        var searchID = $scope.form.id;
        
        // If not a number then set searchID to 1
        if(isNaN(parseFloat(searchID)) && !isFinite(searchID)){
            $scope.showAlert('ID is a number!');
        }
        else{
            // Cors must be enabled to use local resources, there is a plugin for chrome to enable cors
            $http.get('http://' + ip + ':' + port + '/get-d1/' + searchID).then(function(resp) {
                $scope.form.id = resp.data.ID;
                $scope.form.country = resp.data.Country;
                $scope.form.pollutant = resp.data.Pollutant;
                $scope.form.year = resp.data.Year;
                $scope.form.value = resp.data.Value;
            }, function(err) {
            })
        }
    };
    
    // Insert by id function
    $scope.insertData = function() {
        
        $http.post('http://' + ip + ':' + port + '/add-d1/', {id : $scope.form.id, country : $scope.form.country, pollutant : $scope.form.pollutant, year : $scope.form.year, value : $scope.form.value}).then(function (res){
            $scope.showAlert(res.data);
        });
        
    };
    
    // Update by id function
    $scope.updateByID = function() {
        
        $http.post('http://' + ip + ':' + port + '/update-d1/', {id : $scope.form.id, country : $scope.form.country, pollutant : $scope.form.pollutant, year : $scope.form.year, value : $scope.form.value}).then(function (res){
            $scope.showAlert(res.data);
        });
        
    };
    
    // Delete by id function
    $scope.deleteByID = function() {
        
        var deleteID = $scope.form.id;
        
        // If not a number then set searchID to 1
        if(isNaN(parseFloat(deleteID)) && !isFinite(deleteID)){
            $scope.showAlert('ID is a number!');
        }
        else{   
            $http.get('http://' + ip + ':' + port + '/del-d1/' + deleteID).then(function (res){
                $scope.showAlert(res.data);
            });
        }
    };
    
    // Show dialog box message
    $scope.showAlert = function(message) {
        var alertPopup = $ionicPopup.alert({
            title: 'Message',
            template: message
        });
    };
})

.controller('DataSetCtrl2', function($scope, $http, $ionicPopup, $timeout) {
    
    // Connection details
    var ip = 'localhost';
    var port = '11000';
    
    // Data binding object
    $scope.form = {
        'id' : '',
        'time' : '',
        'demand' : ''
    };
    
    // Search by id function
    $scope.searchByID = function() {
        
        var searchID = $scope.form.id;
        
        // If not a number then set searchID to 1
        if(isNaN(parseFloat(searchID)) && !isFinite(searchID)){
            $scope.showAlert('ID is a number!');
        }
        else{
            // Cors must be enabled to use local resources, there is a plugin for chrome to enable cors
            $http.get('http://' + ip + ':' + port + '/get-d2/' + searchID).then(function(resp) {
                $scope.form.id = resp.data.ID;
                $scope.form.time = resp.data.Time;
                $scope.form.demand = resp.data.Demand;
            }, function(err) {
            })
        }
        
    };
    
    // Insert by id function
    $scope.insertData = function() {
        
        $http.post('http://' + ip + ':' + port + '/add-d2/', {time : $scope.form.time, demand : $scope.form.demand}).then(function (res){
            $scope.showAlert(res.data);
        });
        
    };
    
    // Update by id function
    $scope.updateByID = function() {
        
        $http.post('http://' + ip + ':' + port + '/update-d2/', {id : $scope.form.id, time : $scope.form.time, demand : $scope.form.demand}).then(function (res){
            $scope.showAlert(res.data);
        });
        
    };
    
    // Delete by id function
    $scope.deleteByID = function() {
        
        var deleteID = $scope.form.id;
        
        // If not a number then set searchID to 1
        if(isNaN(parseFloat(deleteID)) && !isFinite(deleteID)){
            $scope.showAlert('ID is a number!');
        }
        else{   
            $http.get('http://' + ip + ':' + port + '/del-d2/' + deleteID).then(function (res){
                $scope.showAlert(res.data);
            });
        }
        
    };
    
    // Show dialog box message
    $scope.showAlert = function(message) {
        var alertPopup = $ionicPopup.alert({
            title: 'Message',
            template: message
        });
    };
});