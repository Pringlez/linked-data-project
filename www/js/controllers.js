angular.module('linked-data-project.controllers', [])

.controller('AppCtrl', function($scope, $timeout) {
})

.controller('ChartCtrl1', function($scope, $timeout, PouchdbService) {
    // Controller for the chart page one in ionic application
    // Render functions below to get data from back-end service, then display it using xcharts to user
    $scope.render = function() {
        PouchdbService.getGreenhouseGases().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px;">Greenhouse Gases</h3><figure style="margin-top: 15px; width: 450px; height: 500px;" id="gaschart1"></figure>';
            $("#chart1").html(html); 
            new xChart('line-dotted', chartdata, '#gaschart1', chartdata.options);
        });
        PouchdbService.getCarbonDioxide().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px;">Carbon Dioxide</h3><figure style="margin-top: 15px; width: 450px; height: 500px;" id="gaschart2"></figure>';
            $("#chart2").html(html); 
            new xChart('line-dotted', chartdata, '#gaschart2', chartdata.options);
        });
        PouchdbService.getMethane().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px;">Methane</h3><figure style="margin-top: 15px; width: 450px; height: 500px;" id="gaschart3"></figure>';
            $("#chart3").html(html); 
            new xChart('line-dotted', chartdata, '#gaschart3', chartdata.options);
        });
        PouchdbService.getNitrousOxide().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px;">Nitrous Oxide</h3><figure style="margin-top: 15px; width: 450px; height: 500px;" id="gaschart4"></figure>';
            $("#chart4").html(html); 
            new xChart('line-dotted', chartdata, '#gaschart4', chartdata.options);
        });
        PouchdbService.getHydrofluoroCarbons().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px;">HydroFluoro Carbons</h3><figure style="margin-top: 15px; width: 450px; height: 500px;" id="gaschart5"></figure>';
            $("#chart5").html(html); 
            new xChart('line-dotted', chartdata, '#gaschart5', chartdata.options);
        });
        PouchdbService.getPerfluoroCarbons().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px;">Perfluoro Carbons</h3><figure style="margin-top: 15px; width: 450px; height: 500px;" id="gaschart6"></figure>';
            $("#chart6").html(html); 
            new xChart('line-dotted', chartdata, '#gaschart6', chartdata.options);
        });
        PouchdbService.getSulphurHexafluoride().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px;">Sulphur Hexafluoride</h3><figure style="margin-top: 15px; width: 450px; height: 500px;" id="gaschart7"></figure>';
            $("#chart7").html(html); 
            new xChart('line-dotted', chartdata, '#gaschart7', chartdata.options);
        });
    }
})

.controller('ChartCtrl2', function($scope, $timeout, PouchdbService) {
    // Controller for the chart page one in ionic application
    // Render functions below to get data from back-end service, then display it using xcharts to user
    $scope.render = function() {
        PouchdbService.getEnergyData().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px;">Megawatts</h3><figure style="margin-top: 15px; width: 450px; height: 500px;" id="energychart1"></figure>';
            $("#chart8").html(html); 
            new xChart('line-dotted', chartdata, '#energychart1', chartdata.options);
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
            $http.get('http://' + ip + ':' + port + '/get-d1/' + searchID).then(function(res) {
                if(res.data == '404'){
                    $scope.showAlert('Record Not Found!');
                }
                else{
                    $scope.form.id = res.data.ID;
                    $scope.form.country = res.data.Country;
                    $scope.form.pollutant = res.data.Pollutant;
                    $scope.form.year = res.data.Year;
                    $scope.form.value = res.data.Value;
                }
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
            $http.get('http://' + ip + ':' + port + '/get-d2/' + searchID).then(function(res) {
                if(res.data == '404'){
                    $scope.showAlert('Record Not Found!');
                }
                else{
                    $scope.form.id = res.data.ID;
                    $scope.form.time = res.data.Time;
                    $scope.form.demand = res.data.Demand;
                }
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