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

        $("#content").html(html);

        chart1 = createSummaryChart('#chart1', summary);
        chart2 = createCountryBreakdownChart('#chart2', getCountryBreakdownForYear(selectedYear));
    }
    
    $scope.getData = function(settings) {
        
        var searchID = settings.dataID;
        
        // If not a number then set searchID to 1
        if(isNaN(parseFloat(searchID)) && !isFinite(searchID)){
            alert('ID is a number!');
        }
        else{
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
        }
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
            alert('ID is a number!');
        }
        else{
            // Cors must be enabled to use local resources, there is a plugin for chrome to enable cors
            $http.get('http://192.168.1.102:8000/get-d2/' + searchID).then(function(resp) {
                $scope.dataID = resp.data.ID;
                $scope.dataTime = resp.data.Time;
                $scope.dataDemand = resp.data.Demand;
            }, function(err) {
                alert('Error with DB');
            })
        }
    };
});