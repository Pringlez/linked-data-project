// Import required modules 
// Express API, os module for system related functions, fs module for filesystem - file read/write
// Cors module is to allow cross-site resource sharing
var express = require('express');
var os = require('os');
var fs = require('fs');
var cors = require('cors');

// Databases - RDMS SQLite3 & NoSQL Document DB
var sqlite3 = require('sqlite3').verbose();
var pouchdb = require('pouchdb');

// Create local database or remote couchdb instance
var nosql = new pouchdb('linked-data-project');
//var nosql = new pouchdb('http://192.168.1.142/linked-data-project');

// Access network interface
var ifaces = os.networkInterfaces();
// Array to store validips later
var validIPs = [];

// Function to get & store valid IPs host system has - (Ignoring loop back address)
// I used this for testing on remote node server
Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
    // Loop through 
    ifaces[ifname].forEach(function (iface) {
    // Ignoring internal IPs
    if ('IPv4' !== iface.family || iface.internal !== false) {
        return;
    }
    // This interface has multiple ipv4 addresses
    if (alias >= 1) {
        validIPs.push(iface.address);
    } else {
        validIPs.push(iface.address);
    }
    });
});

// Use if you wish to test with local valid ips
//var ip = validIPs[0];

// Set ip & port
var ip = 'localhost';
var port = 11000;

// Create a HTTP server
var app = express();
// Enable cors, allows cross site resource sharing to serve requests
app.use(cors());

// JSON format files - Couchdb / Pouchdb
var gases_nosql = JSON.parse(fs.readFileSync('gases-nosql.json', 'utf8'));
//var energy-nosql = JSON.parse(fs.readFileSync('energy-nosql.json', 'utf8'));

// Load the parsed json into document database
nosql.put({
    _id: 'gases',
    data: gases_nosql
}).then(function (response) {
    console.log('Gases Document Created!');
}).catch(function (err) {
    console.log(err);
});
/*nosql.put({
    _id: 'energy',
    data: energy-nosql
}).then(function (response) {
    console.log('Energy Document Created!');
}).catch(function (err) {
    console.log(err);
});*/

// JSON format files - sqlite3
var gases_sqlite3 = JSON.parse(fs.readFileSync('gases-sqlite3.json', 'utf8'));
var energy_sqlite3 = JSON.parse(fs.readFileSync('energy-sqlite3.json', 'utf8'));

// Load the database into memory
var db = new sqlite3.Database(':memory:');

// Object to store data for dataset1
var Gas = function(ID, Country, Pollutant, Year, Value){
	this.ID = (ID) ? ID : 0;
	this.Country = (Country) ? Country : "N/A";
	this.Pollutant = (Pollutant) ? Pollutant : "N/A";
	this.Year = (Year) ? Year : "0000";
	this.Value = (Value) ? Value : "0.0";
}

// Object to store data for dataset2
var Energy = function(ID, Time, Demand){
	this.ID = (ID) ? ID : 0;
	this.Time = (Time) ? Time : "N/A";
	this.Demand = (Demand) ? Demand : "N/A";
}

db.serialize(function() {
    // Creating table gases for dataset1
    db.run("CREATE TABLE Gases ("
    + "'ID' INTEGER PRIMARY KEY AUTOINCREMENT, 'Country' VARCHAR(255), 'Pollutant' VARCHAR(255),"
    + "'Year' INTEGER, 'Value' FLOAT)");
    
    // Preparing the SQL statement - dataset1
    var stmt = db.prepare("INSERT INTO Gases ('Country','Pollutant','Year', 'Value') VALUES (?,?,?,?)");
	
    // Loop through each element in the first dataset
	gases_sqlite3.forEach(function(gases){stmt.run(gases.Country, gases.Pollutant, gases.Year, gases.Value);});
	
    // Close finish insert statement
	stmt.finalize();
    console.log("Dataset Gases Loaded!");
    
    // Creating table gases for dataset2
    db.run("CREATE TABLE Energy ('ID' INTEGER PRIMARY KEY AUTOINCREMENT, 'Time' VARCHAR(255), 'Demand' VARCHAR(255))");
    
    // Pareparing the SQL statement - dataset2
    var stmt2 = db.prepare("INSERT INTO Energy ('Time','Demand') VALUES (?,?)");
	
    // Loop through each element in the first dataset
	energy_sqlite3.forEach(function(energy){stmt2.run(energy.Time, energy.Demand);});
	
    // Close finish insert statement
	stmt2.finalize();
    console.log("Dataset Energy Loaded!");
    
    // Print records test
    /*db.each("SELECT * FROM Gases", function(err, row) {
      console.log("ID :" + row.ID + " Pollutant: " + row.Pollutant);
    });*/
    
    /*db.each("SELECT * FROM Energy", function(err, row) {
      console.log("ID :" + row.ID + " Time: " + row.Time + " Demand: " + row.Demand);
    });*/
 });

// API Documentation
app.get('/', function(req, res) {
    res.sendFile(__dirname + '\\' + "api-docs.html");
});

// Get all dataset 1 - return in json format - Will be changed to SQLite3
app.get('/get-d1', function(req, res) {
    res.json(gases_sqlite3);
});

// Get all dataset 2 - return in json format - Will be changed to SQLite3
app.get('/get-d2', function(req, res){
	res.json(energy_sqlite3);
});

// Get data record by ID, dataset 1 - SQLite3
app.get('/get-d1/:id', function(req, res){
    db.serialize(function(){
        // Get record matching id - storing it first in object structure to return as json
        db.each("SELECT * FROM Gases WHERE ID = " + req.params.id, function(err, row) {
            var gasinfo  = new Gas(row.ID , row.Country, row.Pollutant, row.Year, row.Value);
            return res.json(gasinfo);
        });
    });
});

// Get data record by ID, dataset 2 - SQLite3
app.get('/get-d2/:id', function(req, res){
	db.serialize(function(){
        // Get record matching id - storing it first in object structure to return as json
        db.each("SELECT * FROM Energy WHERE ID = " + req.params.id, function(err, row) {
            var energyinfo = new Energy(row.ID , row.Time, row.Demand);
            return res.json(energyinfo);
        });
    });
});

// Delete record by ID in dataset 1 - SQLite3
app.get('/del-d1/:id', function(req, res){
    // Prepare statement to delete by id
    db.serialize(function(){
        var stmt = db.prepare("DELETE FROM Gases WHERE ID = ?");
        stmt.run(req.params.id, function(err, row){
            if (this.changes == 1){
                return res.json("Delete Ok");
            }
            else{
                return res.json("Delete Failed");
            }	
        });
    });
});

// Delete record by ID in dataset 2 - SQLite3
app.get('/del-d2/:id', function(req, res){
    // Prepare statement to delete by id
    db.serialize(function(){
        var stmt = db.prepare("DELETE FROM Energy WHERE ID = ?");
        stmt.run(req.params.id, function(err, row){
            // If statement ran ok, returning message
            if (this.changes == 1){
                return res.json("Delete Ok");
            }
            else{
                return res.json("Delete Failed");
            }	
        });
    });
});

// Allows users to add new data to the SQLite3 database - dataset1
app.post('/add-d1/', function(req, res){
    // Checking if request is a post
    if (req.method == 'POST') {
        var body = '';
        // Adding data from post to body variable, limiting size of post to 1MB
        // Potentially stops API abuse, flooding etc
        req.on('data', function (data) {
            body += data;
            // 1MB post limit
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            // Parse data from body, then prepare insert statement to pass posted data to database
            body = JSON.parse(body);
            db.serialize(function(){
                var stmt = db.prepare("INSERT INTO Gases(Country, Pollutant, Year, Value) VALUES (?,?,?,?)");
                stmt.run(body.country, body.pollutant, body.year, body.value, function(err, row){
                    if (this.changes == 1){
                        return res.json("Insert Ok");
                    }
                    else{
                        return res.json("Insert Failed");
                    }	
                });
            }); 
        });
    }
});

// Allows users to add new data to the SQLite3 database - dataset2
app.post('/add-d2/', function(req, res){
    // Checking if request is a post
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
            // Adding data from post to body variable, limiting size of post to 1MB
            // Potentially stops API abuse, flooding etc
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            // Parse data from body, then prepare insert statement to pass posted data to database
            body = JSON.parse(body);
            db.serialize(function(){
                var stmt = db.prepare("INSERT INTO Energy(Time, Demand) VALUES (?,?)");
                stmt.run(body.time, body.demand, function(err, row){
                    if (this.changes == 1){
                        return res.json("Insert Ok");
                    }
                    else{
                        return res.json("Insert Failed");
                    }	
                });
            });
        });
    }
});

// Allows users to update data on the SQLite3 database - dataset1
app.post('/update-d1/', function(req, res){
    // Checking if request is a post
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
            // 1MB post limit
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            // Parsing the data from the body of the request
            body = JSON.parse(body);
            db.serialize(function(){
                var stmt = db.prepare("UPDATE Gases"
						+ " SET Country = ?, Pollutant = ?, Year = ?, Value = ?"
						+ " WHERE"
						+ " ID = ?");
                // Run the update statement & checking to see if it ran ok, returning message in json
                stmt.run(body.country, body.pollutant, body.year, body.value, body.id, function(err, row){
                    if (this.changes == 1){
                        return res.json("Update Ok");
                    }
                    else{
                        return res.json("Update Failed");
                    }	
                });
            }); 
        });
    }
});

// Allows users to update data on the SQLite3 database - dataset2
app.post('/update-d2/', function(req, res){
    // Checking if request is a post
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
            // 1MB post limit
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            // Parsing the data from the body of the request
            body = JSON.parse(body);
            db.serialize(function(){
                var stmt = db.prepare("UPDATE Energy"
						+ " SET Time = ?, Demand = ?"
						+ " WHERE"
						+ " ID = ?");
                // Run the update statement & checking to see if it ran ok, returning message in json
                stmt.run(body.time, body.demand, body.id, function(err, row){
                    if (this.changes == 1){
                        return res.json("Update Ok");
                    }
                    else{
                        return res.json("Update Failed");
                    }	
                });
            }); 
        });
    }
});

// Get all documents
app.get('/getdocs', function(req, res) {
    // Loop through documents currently in server instance & returning all docs in json
    nosql.allDocs({include_docs: true, descending: true}, function(err, doc) {
        return res.json(doc.rows);
    }).catch(function (err) {
        console.log(err);
    });
});

// Get specific document by name
app.get('/getdoc/:name', function(req, res){
    // Get request, parse name in query & submit to database & return in json
	nosql.get(req.params.name).then(function (doc) {
        return res.json(doc);
    }).catch(function (err) {
        console.log(err);
    });
});

// Add document - test data currently
app.get('/adddoc', function(req, res){
    // Add / Put document by generating id by time / date
    nosql.put({
        _id: new Date().toISOString(),
        title: 'Heroes'
        // Submit result of query in json
    }).then(function (response) {
        return res.json('Add Ok!');
    }).catch(function (err) {
        console.log(err);
    });
});

// Update document, get request /updatedoc?name=todos&title=example - test data currently
app.get('/updatedoc/:name', function(req, res){
    // Get by name of document, then last rev id to update & parse get request data
    nosql.get(req.query.name).then(function(doc) {
        return nosql.put({
            _id: req.query.name,
            _rev: doc._rev,
            title: req.query.title
        });
        // Submit result of query in json
    }).then(function(response) {
        return res.json('Update Ok!');
    }).catch(function (err) {
        console.log(err);
    });
});

// Delete document by name
app.get('/deldoc/:name', function(req, res){
    nosql.get(req.params.name).then(function(doc) {
        nosql.remove(doc);
    }).then(function (result) {
        return res.json('Delete Ok!');
    }).catch(function (err) {
        console.log(err);
    });
});

// Set ip, port of node server API
app.listen(port, ip);

// Display info of the server
console.log("Web Service running on IP: " + ip + " Port: " + port);