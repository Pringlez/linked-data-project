angular.module('linked-data-project.controllers', [])

.controller('AppCtrl', function($scope, $timeout) {
})

.controller('ChartCtrl1', function($scope, $timeout) {
    
    var chart1,
        chart2,
        selectedYear = 2010;

    // Functions to create the individual charts involved in the dashboard
    function createSummaryChart(selector, dataset) {
        
        var data = {
                "xScale": "ordinal",
                "yScale": "linear",
                "main": dataset
            },

            options = {
                "axisPaddingLeft": 0,
                "paddingLeft": 20,
                "paddingRight": 0,
                "axisPaddingRight": 0,
                "axisPaddingTop": 5,
                "yMin": 9,
                "yMax": 40,
                "interpolation": "linear",
                "click": yearSelectionHandler
            },

            legend = d3.select(selector).append("svg")
                .attr("class", "legend")
                .selectAll("g")
                .data(dataset)
                .enter()
                .append("g")
                .attr("transform", function (d, i) {
                    return "translate(" + (64 + (i * 84)) + ", 0)";
                });

        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .attr("class", function (d, i) {
                return 'color' + i;
            });

        legend.append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .text(function (d, i) {
                return dataset[i].country;
            });

        return new xChart('line-dotted', data, selector + " .graph", options);
    }

    function createCountryBreakdownChart(selector, dataset) {
        
        var data = {
                "xScale": "ordinal",
                "yScale": "linear",
                "type": "bar",
                "main": dataset
            },

            options = {
                "axisPaddingLeft": 0,
                "axisPaddingTop": 5,
                "paddingLeft": 20,
                "yMin": 8,
                "yMax": 40
            };

        return new xChart('bar', data, selector + " .graph", options);
    }

    // Data selection handlers
    function yearSelectionHandler(d, i) {
        
        selectedYear = d.x;
        var data = {
            "xScale": "ordinal",
            "yScale": "linear",
            "type": "bar",
            "main": getCountryBreakdownForYear(selectedYear)
        };
        $('#chart2>.title').html('Total Medals by Country in ' + selectedYear);
        chart2.setData(data);
    }

    // Functions to transform/format the data as required by specific charts
    function getCountryBreakdownForYear(year) {
        
        var result = [];
        for (var i = 0; i < results[year].length; i++) {
            result.push({x: results[year][i].Country, y: results[year][i].Total});
        }
        return [
            {
                "className": ".medals",
                "data": result
            }
        ]
    }

    // Render the dashboard
    $scope.render = function() {
        
        var html =
            '<div id="chart1" class="chart chart2">' +
                '<div class="title">Top 5 Medal Countries</div>' +
                '<div class="graph"></div>' +
            '</div>' +
            '<div id="chart2" class="chart chart2">' +
                '<div class="title">Total Medals by Country in 2010</div>' +
                '<div class="graph"></div>' +
            '</div>';

        $("#content1").html(html);

        chart1 = createSummaryChart('#chart1', summary);
        chart2 = createCountryBreakdownChart('#chart2', getCountryBreakdownForYear(selectedYear));
    }
})

.controller('ChartCtrl2', function($scope, $timeout) {
    
    var chart1,
        chart2,
        selectedYear = 2010;

    // Functions to create the individual charts involved in the dashboard
    function createSummaryChart(selector, dataset) {
        
        var data = {
                "xScale": "ordinal",
                "yScale": "linear",
                "main": dataset
            },

            options = {
                "axisPaddingLeft": 0,
                "paddingLeft": 20,
                "paddingRight": 0,
                "axisPaddingRight": 0,
                "axisPaddingTop": 5,
                "yMin": 9,
                "yMax": 40,
                "interpolation": "linear",
                "click": yearSelectionHandler
            },

            legend = d3.select(selector).append("svg")
                .attr("class", "legend")
                .selectAll("g")
                .data(dataset)
                .enter()
                .append("g")
                .attr("transform", function (d, i) {
                    return "translate(" + (64 + (i * 84)) + ", 0)";
                });

        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .attr("class", function (d, i) {
                return 'color' + i;
            });

        legend.append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .text(function (d, i) {
                return dataset[i].country;
            });

        return new xChart('line-dotted', data, selector + " .graph", options);
    }

    function createCountryBreakdownChart(selector, dataset) {
        
        var data = {
                "xScale": "ordinal",
                "yScale": "linear",
                "type": "bar",
                "main": dataset
            },

            options = {
                "axisPaddingLeft": 0,
                "axisPaddingTop": 5,
                "paddingLeft": 20,
                "yMin": 8,
                "yMax": 40
            };

        return new xChart('bar', data, selector + " .graph", options);
    }

    // Data selection handlers
    function yearSelectionHandler(d, i) {
        
        selectedYear = d.x;
        var data = {
            "xScale": "ordinal",
            "yScale": "linear",
            "type": "bar",
            "main": getCountryBreakdownForYear(selectedYear)
        };
        $('#chart2>.title').html('Total Medals by Country in ' + selectedYear);
        chart2.setData(data);
    }

    // Functions to transform/format the data as required by specific charts
    function getCountryBreakdownForYear(year) {
        
        var result = [];
        for (var i = 0; i < results[year].length; i++) {
            result.push({x: results[year][i].Country, y: results[year][i].Total});
        }
        return [
            {
                "className": ".medals",
                "data": result
            }
        ]
    }

    // Render the dashboard
    $scope.render = function() {
        
        var html =
            '<div id="chart3" class="chart chart2">' +
                '<div class="title">Top 5 Medal Countries</div>' +
                '<div class="graph"></div>' +
            '</div>' +
            '<div id="chart4" class="chart chart2">' +
                '<div class="title">Total Medals by Country in 2010</div>' +
                '<div class="graph"></div>' +
            '</div>';

        $("#content2").html(html);

        chart1 = createSummaryChart('#chart3', summary);
        chart2 = createCountryBreakdownChart('#chart4', getCountryBreakdownForYear(selectedYear));
    }
})

.controller('DataSetCtrl1', function($scope, $http, $timeout) {
    
    $scope.form = {
        'id' : '',
        'country' : '',
        'pollutant' : '',
        'year' : '',
        'value' : ''
    };
    
    $scope.searchByID = function() {
        
        var searchID = $scope.form.id;
        
        // If not a number then set searchID to 1
        if(isNaN(parseFloat(searchID)) && !isFinite(searchID)){
            alert('ID is a number!');
        }
        else{
            // Cors must be enabled to use local resources, there is a plugin for chrome to enable cors
            $http.get('http://192.168.1.187:8000/get-d1/' + searchID).then(function(resp) {
                $scope.form.id = resp.data.ID;
                $scope.form.country = resp.data.Country;
                $scope.form.pollutant = resp.data.Pollutant;
                $scope.form.year = resp.data.Year;
                $scope.form.value = resp.data.Value;
            }, function(err) {
                alert('Error with DB');
            })
        }
    };
    
    $scope.insertData = function() {
        
        $http.post('http://192.168.1.187:8000/add-d1/', {id : $scope.form.id, country : $scope.form.country, pollutant : $scope.form.pollutant, year : $scope.form.year, value : $scope.form.value}).then(function (res){
            alert(res.data);
        });
        
    };
    
    $scope.updateByID = function() {
        
        $http.post('http://192.168.1.187:8000/update-d1/', {id : $scope.form.id, country : $scope.form.country, pollutant : $scope.form.pollutant, year : $scope.form.year, value : $scope.form.value}).then(function (res){
            alert(res.data);
        });
        
    };
    
    $scope.deleteByID = function() {
        
        var deleteID = $scope.form.id;
        
        // If not a number then set searchID to 1
        if(isNaN(parseFloat(deleteID)) && !isFinite(deleteID)){
            alert('ID is a number!');
        }
        else{   
            $http.get('http://192.168.1.187:8000/del-d1/' + deleteID).then(function (res){
                alert(res.data);
            });
        }
        
    };
})

.controller('DataSetCtrl2', function($scope, $http, $timeout) {
    
    $scope.form = {
        'id' : '',
        'time' : '',
        'demand' : ''
    };
    
    $scope.searchByID = function() {
        
        var searchID = $scope.form.id;
        
        // If not a number then set searchID to 1
        if(isNaN(parseFloat(searchID)) && !isFinite(searchID)){
            alert('ID is a number!');
        }
        else{
            // Cors must be enabled to use local resources, there is a plugin for chrome to enable cors
            $http.get('http://192.168.1.187:8000/get-d2/' + searchID).then(function(resp) {
                $scope.form.id = resp.data.ID;
                $scope.form.time = resp.data.Time;
                $scope.form.demand = resp.data.Demand;
            }, function(err) {
                alert('Error with DB');
            })
        }
    };
    
    $scope.insertData = function() {
        
        $http.post('http://192.168.1.187:8000/add-d2/', {time : $scope.form.time, demand : $scope.form.demand}).then(function (res){
            alert(res.data);
        });
        
    };
    
    $scope.updateByID = function() {
        
        $http.post('http://192.168.1.187:8000/update-d2/', {id : $scope.form.id, time : $scope.form.time, demand : $scope.form.demand}).then(function (res){
            alert(res.data);
        });
        
    };
    
    $scope.deleteByID = function() {
        
        var deleteID = $scope.form.id;
        
        // If not a number then set searchID to 1
        if(isNaN(parseFloat(deleteID)) && !isFinite(deleteID)){
            alert('ID is a number!');
        }
        else{   
            $http.get('http://192.168.1.187:8000/del-d2/' + deleteID).then(function (res){
                alert(res.data);
            });
        }
        
    };
});