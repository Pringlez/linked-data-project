# Linked Data and Semantic Web Project
** John Walsh **

Project Details
---------------
0. The project's front-end is built in Ionic / Cordova, currently its primary function of the ionic application is to test the NodeJS API
0. The back-end API is constructed in NodeJS adhering to RESTful principles
0. The NodeJS back-end will utilize a PouchDB / CounchDB document database & RDMS SQLite3 node module, both databases will be available to end users of the API
0. The front-end utilizes both databases, the NoSQL document API will drive the xCharts / D3 charts in the ionic chart pages. The RDMS SQLite3 API will be serving the form pages

Datasets
--------
The datasets I'm using for this project are sourced from (http://stats.oecd.org/). I've chosen  to use a dataset related to the amount of pollutants being generated between roughly between 2007 to 2011. My second dataset will display the amount of energy being used during the same time period. There may be a correlation between the two datasets - Does the amount of energy being consumed effect the pollutant levels?

Installation - Ionic Front-end
------------
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
npm install -g cordova ionic
```

Installation - NodeJS Back-end
------
Start the Node API by running the following command in the 'api' directory. Make sure you ran the 'npm install' to install the required dependencies.

```
node node-api.js
```

By default the NodeJS API will be configured to run using localhost and will listen on port 11000. I've also included the option to run the API on the first valid ip address on the host machine, this could be handy deploying to remote node servers.

Usage
-----
Navigate  to the root project directory, run the application by running the following command. You could also add the option
'--lab' to the command below to test on both on iOS and Android.

```
ionic serve
```
To use the RESTful Node API, visit the following valid URLs:

```
http://localhost:11000/
```
```
http://localhost:11000/get-d1/
```
```
http://localhost:11000/get-d2/
```

To be updated later...

