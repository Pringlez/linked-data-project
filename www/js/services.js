angular.module('linked-data-project.services', [])

.factory('PouchdbService', function($http) {
    return {
		getGreenhouseGases: function(){
			return $http.get("http://localhost:11000/getdoc/greenhousegases").then(function(res){
				var data = res.data;
				return data;
			}, function(err){
				alert(JSON.stringify(err));
			});
		}
	}
});