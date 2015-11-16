angular.module('linked-data-project.services', [])

.factory('PouchdbService', function($http) {
    
    // Link to the documents in CouchDb / PouchDB
    var linkGases = 'http://localhost:11000/getdoc/gases';
    var linkEnergy = 'http://localhost:11000/getdoc/energy';
    
    // Dataset 1 - Gases - Functions
    return {
		getGreenhouseGases: function(){
            // Send get request to gases document
			return $http.get(linkGases).then(function(res){
				var info = res.data;
                // Returning only data for the chart
                return info.data.gases.greenhousegases.data;
			}, function(err){
                // If error then display to user
                alert(JSON.stringify(err));
			});
		},
        getCarbonDioxide: function(){
            // Send get request to gases document
			return $http.get(linkGases).then(function(res){
				var info = res.data;
                // Returning only data for the chart
                return info.data.gases.carbondioxide.data;
			}, function(err){
                // If error then display to user
                alert(JSON.stringify(err));
			});
		},
        getMethane: function(){
            // Send get request to gases document
			return $http.get(linkGases).then(function(res){
				var info = res.data;
                // Returning only data for the chart
                return info.data.gases.methane.data;
			}, function(err){
                // If error then display to user
                alert(JSON.stringify(err));
			});
		},
        getNitrousOxide: function(){
            // Send get request to gases document
			return $http.get(linkGases).then(function(res){
				var info = res.data;
                // Returning only data for the chart
                return info.data.gases.nitrousoxide.data;
			}, function(err){
                // If error then display to user
                alert(JSON.stringify(err));
			});
		},
        getHydrofluoroCarbons: function(){
            // Send get request to gases document
			return $http.get(linkGases).then(function(res){
				var info = res.data;
                // Returning only data for the chart
                return info.data.gases.hydrofluorocarbons.data;
			}, function(err){
                // If error then display to user
                alert(JSON.stringify(err));
			});
		},
        getPerfluoroCarbons: function(){
            // Send get request to gases document
			return $http.get(linkGases).then(function(res){
				var info = res.data;
                // Returning only data for the chart
                return info.data.gases.perfluorocarbons.data;
			}, function(err){
                // If error then display to user
                alert(JSON.stringify(err));
			});
		},
        getSulphurHexafluoride: function(){
            // Send get request to gases document
			return $http.get(linkGases).then(function(res){
				var info = res.data;
                // Returning only data for the chart
                return info.data.gases.sulphurhexafluoride.data;
			}, function(err){
                // If error then display to user
                alert(JSON.stringify(err));
			});
		},
        
        // Dataset 2 - Energy - Functions
        getEnergyData: function(){
            // Send get request to energy document
			return $http.get(linkEnergy).then(function(res){
				var info = res.data;
                // Returning only data for the chart
                return info.data.energy.megawatts.data;
			}, function(err){
                // If error then display to user
                alert(JSON.stringify(err));
			});
		},
        getMonthAverage2007: function(){
            // Send get request to energy document
			return $http.get(linkEnergy).then(function(res){
				var info = res.data;
                // Returning only data for the chart
                return info.data.energy.year2007.data;
			}, function(err){
                // If error then display to user
                alert(JSON.stringify(err));
			});
		},
        getMonthAverage2008: function(){
            // Send get request to energy document
			return $http.get(linkEnergy).then(function(res){
				var info = res.data;
                // Returning only data for the chart
                return info.data.energy.year2008.data;
			}, function(err){
                // If error then display to user
                alert(JSON.stringify(err));
			});
		},
        getMonthAverage2009: function(){
            // Send get request to energy document
			return $http.get(linkEnergy).then(function(res){
				var info = res.data;
                // Returning only data for the chart
                return info.data.energy.year2009.data;
			}, function(err){
                // If error then display to user
                alert(JSON.stringify(err));
			});
		},
        getMonthAverage2010: function(){
            // Send get request to energy document
			return $http.get(linkEnergy).then(function(res){
				var info = res.data;
                // Returning only data for the chart
                return info.data.energy.year2010.data;
			}, function(err){
                // If error then display to user
                alert(JSON.stringify(err));
			});
		},
        getMonthAverage2011: function(){
            // Send get request to energy document
			return $http.get(linkEnergy).then(function(res){
				var info = res.data;
                // Returning only data for the chart
                return info.data.energy.year2011.data;
			}, function(err){
                // If error then display to user
                alert(JSON.stringify(err));
			});
		}
	}
});