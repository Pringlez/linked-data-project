angular.module('linked-data-project.services', [])

.factory('PouchdbService', function($http) {
    
    var linkGases = 'http://localhost:11000/getdoc/gases';
    var linkEnergy = 'http://localhost:11000/getdoc/energy';
    
    // Dataset 1 - Gases - Functions
    return {
		getGreenhouseGases: function(){
			return $http.get(linkGases).then(function(res){
				var info = res.data;
                return info.data.gases.greenhousegases.data;
			}, function(err){
                alert(JSON.stringify(err));
			});
		},
        getCarbonDioxide: function(){
			return $http.get(linkGases).then(function(res){
				var info = res.data;
                return info.data.gases.carbondioxide.data;
			}, function(err){
                alert(JSON.stringify(err));
			});
		},
        getMethane: function(){
			return $http.get(linkGases).then(function(res){
				var info = res.data;
                return info.data.gases.methane.data;
			}, function(err){
                alert(JSON.stringify(err));
			});
		},
        getNitrousOxide: function(){
			return $http.get(linkGases).then(function(res){
				var info = res.data;
                return info.data.gases.nitrousoxide.data;
			}, function(err){
                alert(JSON.stringify(err));
			});
		},
        getHydrofluoroCarbons: function(){
			return $http.get(linkGases).then(function(res){
				var info = res.data;
                return info.data.gases.hydrofluorocarbons.data;
			}, function(err){
                alert(JSON.stringify(err));
			});
		},
        getPerfluoroCarbons: function(){
			return $http.get(linkGases).then(function(res){
				var info = res.data;
                return info.data.gases.perfluorocarbons.data;
			}, function(err){
                alert(JSON.stringify(err));
			});
		},
        getSulphurHexafluoride: function(){
			return $http.get(linkGases).then(function(res){
				var info = res.data;
                return info.data.gases.sulphurhexafluoride.data;
			}, function(err){
                alert(JSON.stringify(err));
			});
		},
        
        // Dataset 2 - Energy - Functions
        getEnergyData: function(){
			return $http.get(linkEnergy).then(function(res){
				var info = res.data;
                return info.data.energy.megawatts.data;
			}, function(err){
                alert(JSON.stringify(err));
			});
		}
	}
});