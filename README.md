# Linked Data and Semantic Web Project
## John Walsh

Project Details
---------------
0. The project's front-end is built in Ionic / Cordova, currently its primary function of the ionic application is to test the NodeJS API
0. The back-end API is constructed in NodeJS adhering to RESTful principles
0. The NodeJS back-end will utilize a PouchDB / CounchDB document database & RDMS SQLite3 node module, both databases will be available to end users of the API
0. The front-end utilizes both databases, the NoSQL document API will drive the xCharts / D3 charts in the ionic chart pages. The RDMS SQLite3 API will be serving the form pages

Datasets
--------
The datasets I'm using for this project are sourced from [www.stats.oecd.org](http://stats.oecd.org/). The first dataset I've chosen to use contains data related to the level of pollutants being generated and expelled into the atmosphere roughly between 2007 to 2011.

My second dataset will display the amount of energy being used during the same time period. There may be a correlation between the two datasets - I've ask myself "Does the amount of energy being consumed effect the pollutant levels?". The charts I've implemented in the front-end will help you visualize any correlation between the two datasets.

I've formatted the data into two different structures, one being for the SQLite database and the other for a NoSQL document database.  

The Energy dataset NoSQL structure contains monthly averages for the amount of energy consumed for each year, this data is sourced from the SQLite Energy dataset. 

The Gases dataset NoSQL structure contains the averages for each year for every pollutant, this data is also sourced from the SQLite Gases dataset.

Links to dataset structures

[Energy - SQLite3](http://johnsprojects.dyndns.org/resources/linked-data-project/datasets/energy-sqlite3.json)
[Gases - SQLite3](http://johnsprojects.dyndns.org/resources/linked-data-project/datasets/gases-sqlite3.json)
[Energy - NoSQL](http://johnsprojects.dyndns.org/resources/linked-data-project/datasets/energy-nosql.json)
[Gases - NoSQL](http://johnsprojects.dyndns.org/resources/linked-data-project/datasets/gases-nosql.json)

Unfortunately, the Apps4Gaps datasets are quite fragmented, and weren't suitable to provide the necessary information in a suitable format. This is way I choose to look for a different source for data

Installation - Ionic Front-end
------------------------------
To run front-end ionic project, you first need to install dependencies, run the following command in the root directory to install the front-end modules required. Also make sure you have cordova & ionic installed, you can check by running 'cordova -v' & 'ionic -v'. If you don't have them installed you can not run the front-end application. Run the two commands just below the first 'npm install' command to install cordova & ionic globally.

To install dependencies
```
npm install
```

To install cordova globally
```
npm install -g cordova
```

To install ionic globally
```
npm install -g ionic
```

Installation - NodeJS Back-end
------------------------------
You first need to install the required dependencies in the 'api' directory. Make sure you run the following 'npm install' to install the required dependencies for the API.

To install dependencies
```
npm install
```

Then, after installing the required modules. Run the API by typing the following command in the 'api' directory

```
node node-api.js
```

By default the NodeJS API will be configured to run using localhost and will listen on port 11000. I've also included an option in the source code to switch the API to run on the first valid ip address on the host machine, this could be handy deploying to remote node servers.

Ionic Usage
-----------
Navigate  to the root project directory, run the application by running the following command. You could also add the option
'--lab' to the command below to test on both on iOS and Android.

```
ionic serve
```

API / NodeJS Usage
------------------
Below is a list of URLs that can be used to request data from either SQLite3 or CouchDB / PouchDB databases

### SQLite3 RESTful Node API, example URLs:
Root directory, displays html detailing API
```
http://localhost:11000/
```

Get all of the gas pollutants dataset
```
http://localhost:11000/get-d1/
```

Get all of the energy consumption dataset
```
http://localhost:11000/get-d2/
```

Get specific data record from gas pollutants dataset by ID
```
http://localhost:11000/get-d1/:id
```

Get specific data record from energy dataset by ID
```
http://localhost:11000/get-d2/:id
```

Delete specific data record from gas pollutants dataset by ID
```
http://localhost:11000/del-d1/:id
```

Delete specific data record from energy dataset by ID
```
http://localhost:11000/del-d2/:id
```

Add to the gas pollutants dataset by posting 'country', 'pollutant', 'year', 'value' variables to the API URL
```
http://localhost:11000/add-d1/
```

Add to the energy dataset by posting 'time', 'demand' variables to the API URL
```
http://localhost:11000/add-d2/
```

Update a record by ID in the gas pollutants dataset by posting 'country', 'pollutant', 'year', 'value' variables to the API URL
```
http://localhost:11000/update-d1/
```

Update a record by ID in the energy dataset by posting 'time', 'demand' variables to the API URL
```
http://localhost:11000/update-d2/
```
### NoSQL CouchDB / PouchDB RESTful Node API, example URLs:

Get all documents in every database in PouchDB / CouchDB instance
```
http://localhost:11000/getdocs/
```

Get specific document in PouchDB / CouchDB server by 'name' get request
```
http://localhost:11000/getdoc/:name
```

Update specific document in PouchDB / CouchDB server by 'name' get request
```
http://localhost:11000/updatedoc/:name
```

Delete specific document in PouchDB / CouchDB server by 'name' get request
```
http://localhost:11000/deldoc/:name
```
### Code Examples:
The following example is written in javascript, to send a get request. Pass for example
"http://localhost:11000/get-d1/" to the function
```
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
```

This example can be used in an Ionic application, you can paste the following code into
a controller.
```
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
```

Online References
-----------------
This section will detail the online resources used to help develop this API

#### Links

Setting up pouchdb
http://pouchdb.com/guides/setup-couchdb.html

Useful commands for PouchDB / CouchDB
http://wern-ancheta.com/blog/2015/04/26/getting-started-with-couchdb-in-node-dot-js/

D3 Research - Graphs, Charts..
https://github.com/mbostock/d3/wiki/Gallery

Ionic Research #1
http://mcgivery.com/structure-of-an-ionic-app/

Ionic Research #2
http://learn.ionicframework.com/formulas/backend-data/

Ionic Research #3
https://blog.nraboy.com/2015/03/create-todo-list-mobile-app-using-ionic-framework/

xCharts Examples
http://tenxer.github.io/xcharts/examples/

Dataset 1 - Pollutants
http://stats.oecd.org/

Dataset 2 - Energy
http://www.eirgridgroup.com/how-the-grid-works/system-information/
