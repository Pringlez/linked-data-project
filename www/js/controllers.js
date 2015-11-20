angular.module('linked-data-project.controllers', [])

.controller('AppCtrl', function($scope, $timeout) {
})

.controller('ChartCtrl1', function($scope, $timeout, PouchdbService) {
    // Controller for the chart page one in ionic application
    // Render functions below to get data from back-end service, then display it using xcharts to user
    $scope.render = function() {
        // Calls function in services to get greenhouse gases chart data
        PouchdbService.getGreenhouseGases().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px;">Greenhouse Gases</h3><figure style="margin-top: 15px; width: 100%; height: 500px;" id="gaschart1"></figure>';
            // Render html in page & set chart data to that object
            $("#chart1").html(html); 
            new xChart('line-dotted', chartdata, '#gaschart1', chartdata.options);
        });
        // Calls function in services to get carbon dioxide gases chart data
        PouchdbService.getCarbonDioxide().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px; margin-top: 30px;">Carbon Dioxide</h3><figure style="margin-top: 15px; width: 100%; height: 500px;" id="gaschart2"></figure>';
            // Render html in page & set chart data to that object
            $("#chart2").html(html); 
            new xChart('line-dotted', chartdata, '#gaschart2', chartdata.options);
        });
        // Calls function in services to get methane gases chart data
        PouchdbService.getMethane().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px; margin-top: 30px;">Methane</h3><figure style="margin-top: 15px; width: 100%; height: 500px;" id="gaschart3"></figure>';
            // Render html in page & set chart data to that object
            $("#chart3").html(html); 
            new xChart('line-dotted', chartdata, '#gaschart3', chartdata.options);
        });
        // Calls function in services to get nitrous oxide gases chart data
        PouchdbService.getNitrousOxide().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px; margin-top: 30px;">Nitrous Oxide</h3><figure style="margin-top: 15px; width: 100%; height: 500px;" id="gaschart4"></figure>';
            // Render html in page & set chart data to that object
            $("#chart4").html(html); 
            new xChart('line-dotted', chartdata, '#gaschart4', chartdata.options);
        });
        // Calls function in services to get hydrofluoro carbons gases chart data
        PouchdbService.getHydrofluoroCarbons().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px; margin-top: 30px;">HydroFluoro Carbons</h3><figure style="margin-top: 15px; width: 100%; height: 500px;" id="gaschart5"></figure>';
            // Render html in page & set chart data to that object
            $("#chart5").html(html); 
            new xChart('line-dotted', chartdata, '#gaschart5', chartdata.options);
        });
        // Calls function in services to get perfluoro carbons gases chart data
        PouchdbService.getPerfluoroCarbons().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px; margin-top: 30px;">Perfluoro Carbons</h3><figure style="margin-top: 15px; width: 100%; height: 500px;" id="gaschart6"></figure>';
            // Render html in page & set chart data to that object
            $("#chart6").html(html); 
            new xChart('line-dotted', chartdata, '#gaschart6', chartdata.options);
        });
        // Calls function in services to get sulphur hexafluoride gases chart data
        PouchdbService.getSulphurHexafluoride().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px; margin-top: 30px;">Sulphur Hexafluoride</h3><figure style="margin-top: 15px; width: 100%; height: 500px;" id="gaschart7"></figure>';
            // Render html in page & set chart data to that object
            $("#chart7").html(html); 
            new xChart('line-dotted', chartdata, '#gaschart7', chartdata.options);
        });
    }
    
    $scope.render();
})

.controller('ChartCtrl2', function($scope, $timeout, PouchdbService) {
    // Controller for the chart page two in ionic application
    // Render functions below to get data from back-end service, then display it using xcharts to user
    $scope.render = function() {
        // Calls function in services to get average MW of each years
        PouchdbService.getEnergyData().then(function(chartdata){
            var html = '<h3 style="margin-left: 120px; margin-top: 30px;">Megawatts</h3><figure style="margin-top: 15px; width: 100%; height: 500px;" id="energychart1"></figure>';
            $("#chart8").html(html); 
            // Render html in page & set chart data to that object
            new xChart('line-dotted', chartdata, '#energychart1', chartdata.options);
        });
    }
    
    $scope.render();
})

.controller('ChartCtrl3', function($scope, $timeout, PouchdbService) {
    // Controller for the chart page three in ionic application
    // Render functions below to get data from back-end service, then display it using xcharts to user
    $scope.render = function() {
        // Calls function in services to get average MW of each month of the year
        PouchdbService.getMonthAverage2007().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px; margin-top: 30px;">Megawatts - 2007</h3><figure style="margin-top: 15px; width: 100%; height: 500px;" id="energychart2007"></figure>';
            $("#chart9").html(html); 
            // Render html in page & set chart data to that object
            new xChart('bar', chartdata, '#energychart2007', chartdata.options);
        });
        // Calls function in services to get average MW of each month of the year
        PouchdbService.getMonthAverage2008().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px; margin-top: 30px;">Megawatts - 2008</h3><figure style="margin-top: 15px; width: 100%; height: 500px;" id="energychart2008"></figure>';
            $("#chart10").html(html); 
            // Render html in page & set chart data to that object
            new xChart('bar', chartdata, '#energychart2008', chartdata.options);
        });
        // Calls function in services to get average MW of each month of the year
        PouchdbService.getMonthAverage2009().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px; margin-top: 30px;">Megawatts - 2009</h3><figure style="margin-top: 15px; width: 100%; height: 500px;" id="energychart2009"></figure>';
            $("#chart11").html(html); 
            // Render html in page & set chart data to that object
            new xChart('bar', chartdata, '#energychart2009', chartdata.options);
        });
        // Calls function in services to get average MW of each month of the year
        PouchdbService.getMonthAverage2010().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px; margin-top: 30px;">Megawatts - 2010</h3><figure style="margin-top: 15px; width: 100%; height: 500px;" id="energychart2010"></figure>';
            $("#chart12").html(html); 
            // Render html in page & set chart data to that object
            new xChart('bar', chartdata, '#energychart2010', chartdata.options);
        });
        // Calls function in services to get average MW of each month of the year
        PouchdbService.getMonthAverage2011().then(function(chartdata){
            var html = '<h3 style="margin-left: 80px; margin-top: 30px;">Megawatts - 2011</h3><figure style="margin-top: 15px; width: 100%; height: 500px;" id="energychart2011"></figure>';
            $("#chart13").html(html); 
            // Render html in page & set chart data to that object
            new xChart('bar', chartdata, '#energychart2011', chartdata.options);
        });
    }
    
    $scope.render();
})

.controller('DataSetCtrl1', function($scope, $http, $ionicPopup, $stateParams, $timeout) {
    
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
                // If the record id is not found, display error message
                if(res.data == '404'){
                    $scope.showAlert('Record Not Found!');
                }
                else{
                    // Setting form with retrieved data
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
        // Posts data from the front end to the API, passes Country, Pollutant, Year & Value variables
        $http.post('http://' + ip + ':' + port + '/add-d1/', {country : $scope.form.country, pollutant : $scope.form.pollutant, year : $scope.form.year, value : $scope.form.value}).then(function (res){
            $scope.showAlert(res.data);
        });
    };
    
    // Update by id function
    $scope.updateByID = function() {
        // Posts data from the front end to the API with ID to update a specific record
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
            // Send get request to delete specific record
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
    
    function checkParams(){
        $scope.form.id = $stateParams.recordId;
        $scope.searchByID();
    }
    
    checkParams();
})

.controller('DataSetCtrlList1', function($scope, $http, $timeout) {
    
    // Connection details
    var ip = 'localhost';
    var port = '11000';

    $scope.delete = function(record) {
        alert('Delete Item: ' + record.ID);
        $scope.records.splice($scope.records.indexOf(item), 1);
    };

    $scope.onRecordDelete = function(item) {
        $scope.records.splice($scope.records.indexOf(item), 1);
    };
    
    $scope.records = [];
    
    getAllRecords = function() {
        
        // Cors must be enabled to use local resources, there is a plugin for chrome to enable cors
        $http.get('http://' + ip + ':' + port + '/get-d1/').then(function(res) {

            $scope.records = res.data;
            $scope.records = $scope.records[0];

        }, function(err) {
        });
    }
    
    getAllRecords();
})

.controller('DataSetCtrl2', function($scope, $http, $ionicPopup, $stateParams, $timeout) {
    
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
                // If the record id is not found, display error message
                if(res.data == '404'){
                    $scope.showAlert('Record Not Found!');
                }
                else{
                    // Setting form with retrieved data
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
        // Posts data from the front end to the API, passes Time & Demand variables
        $http.post('http://' + ip + ':' + port + '/add-d2/', {time : $scope.form.time, demand : $scope.form.demand}).then(function (res){
            $scope.showAlert(res.data);
        });
    };
    
    // Update by id function
    $scope.updateByID = function() {
        // Posts data from the front end to the API with ID to update a specific record
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
            // Send get request to delete specific record
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
    
    function checkParams(){
        $scope.form.id = $stateParams.recordId;
        $scope.searchByID();
    }
    
    checkParams();
})

.controller('DataSetCtrlList2', function($scope, $http, $timeout) {
  
  // Connection details
    var ip = 'localhost';
    var port = '11000';

    $scope.delete = function(record) {
        alert('Delete Item: ' + record.ID);
        $scope.records.splice($scope.records.indexOf(item), 1);
    };

    $scope.onRecordDelete = function(item) {
        $scope.records.splice($scope.records.indexOf(item), 1);
    };
    
    $scope.records = [];
    
    getAllRecords = function(recLimit) {
        
        // Cors must be enabled to use local resources, there is a plugin for chrome to enable cors
        // I limited the query here because there is about 500000 rows in the database
        $http.get('http://' + ip + ':' + port + '/get-d2-limit/' + recLimit).then(function(res) {

            $scope.records = res.data;
            $scope.records = $scope.records[0];

        }, function(err) {
        });
    }
    
    // Limited to 100 records, feel free to change
    getAllRecords(100);
});