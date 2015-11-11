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
The datasets I'm using for this project are sourced from (http://stats.oecd.org/). I've chosen  to use a dataset related to the amount of pollutants being generated between roughly between 2007 to 2011. My second dataset will display the amount of energy being used during the same time period. There may be a correlation between the two datasets - Does the amount of energy being consumed effect the pollutant levels?. This is the question I asked myself when I was looking for good datasets. Unfortunately Apps4Gaps datasets weren't detailed enough to provide this information in a suitable format.

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
