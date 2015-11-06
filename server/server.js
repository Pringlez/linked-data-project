// Import required modules
var express = require('express');
var PouchDB = require('pouchdb');
var fs = require('fs');
// Database
var sqlite3 = require('sqlite3').verbose();
// Create local database
var nosql = new PouchDB('linked-data-project');
//var nosql = new PouchDB('http://192.168.1.142/linked-data-project');
// Cors (Cross-origin resource sharing)
var cors = require('cors');

var os = require('os');
var ifaces = os.networkInterfaces();

var qs = require('querystring');

var validIPs = [];

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    // Skip internal IPs
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

//var ip = validIPs[0];
var ip = 'localhost';
var port = 11000;

// Create a HTTP server
var app = express();
// Enable cors, allows cross site resource sharing to serve requests
app.use(cors());

// Pouchdb insert test doc
nosql.put({
    _id: 'greenhousegases',
    data: {
      "xScale": "ordinal",
      "yScale": "linear",
      "type": "line",
      "main": [
        {
          "className": ".gases",
          "data": [
            {
              "x": 2007,
              "y": 68370
            },
            {
              "x": 2008,
              "y": 68020
            },
            {
              "x": 2009,
              "y": 62312
            },
            {
              "x": 2010,
              "y": 61894
            },
            {
              "x": 2011,
              "y": 57749
            }
          ]
        }
      ],
      "options": {
        "axisPaddingLeft": 0,
        "paddingLeft": 45,
        "paddingRight": 0,
        "axisPaddingRight": 0,
        "axisPaddingTop": 20,
        "interpolation": "linear"
      }
    }
}).then(function (response) {
    console.log('Document Created!');
}).catch(function (err) {
    console.log(err);
});

// JSON format files
var data1 = JSON.parse(fs.readFileSync('greenhousegases.json', 'utf8'));
var data2 = JSON.parse(fs.readFileSync('energyusage.json', 'utf8'));

var db = new sqlite3.Database(':memory:');

var Gas = function(ID, Country, Pollutant, Year, Value){
	this.ID = (ID) ? ID : 0;
	this.Country = (Country) ? Country : "N/A";
	this.Pollutant = (Pollutant) ? Pollutant : "N/A";
	this.Year = (Year) ? Year : "0000";
	this.Value = (Value) ? Value : "0.0";
}

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
    
    // Pareparing the SQL statement
    var stmt = db.prepare("INSERT INTO Gases ('Country','Pollutant','Year', 'Value') VALUES (?,?,?,?)");
	
    // Loop through each element in the first dataset
	data1.forEach(function(gases){stmt.run(gases.Country, gases.Pollutant, gases.Year, gases.Value);});
	
    // Close finish insert statement
	stmt.finalize();
    console.log("Dataset Gases Loaded!");
    
    // Creating table gases for dataset2
    db.run("CREATE TABLE Energy ('ID' INTEGER PRIMARY KEY AUTOINCREMENT, 'Time' VARCHAR(255), 'Demand' VARCHAR(255))");
    
    // Pareparing the SQL statement
    var stmt2 = db.prepare("INSERT INTO Energy ('Time','Demand') VALUES (?,?)");
	
    // Loop through each element in the first dataset
	data2.forEach(function(energy){stmt2.run(energy.Time, energy.Demand);});
	
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

// Message to user
app.get('/', function(req, res) {
    res.json({ message: 'Linked-Data-API Working!' });
});

// Get all dataset 1
app.get('/get-d1', function(req, res) {
    res.json(data1);
});

// Get all dataset 2
app.get('/get-d2', function(req, res){
	res.json(data2);
});

// Get data by ID, dataset 1
app.get('/get-d1/:id', function(req, res){
    db.serialize(function(){
        db.each("SELECT * FROM Gases WHERE ID = " + req.params.id, function(err, row) {
                var gasinfo  = new Gas(row.ID , row.Country, row.Pollutant, row.Year, row.Value);
                return res.json(gasinfo);
        });
    });
});

// Get data by ID, dataset 2
app.get('/get-d2/:id', function(req, res){
	db.serialize(function(){
        db.each("SELECT * FROM Energy WHERE ID = " + req.params.id, function(err, row) {
                var energyinfo = new Energy(row.ID , row.Time, row.Demand);
                return res.json(energyinfo);
        });
    });
});

// Delete by ID in dataset 1
app.get('/del-d1/:id', function(req, res){
    var gas = new Gas(req.params.id);
    db.serialize(function(){
        var stmt = db.prepare("DELETE FROM Gases WHERE ID = ?");
        stmt.run(gas.ID, function(err, row){
            if (this.changes == 1){
                return res.json("Delete Ok");
            }
            else{
                return res.json("Delete Failed");
            }	
        });
    });
});

// Delete by ID in dataset 2
app.get('/del-d2/:id', function(req, res){
	var energy = new Energy(req.params.id);
    db.serialize(function(){
        var stmt = db.prepare("DELETE FROM Energy WHERE ID = ?");
        stmt.run(energy.ID, function(err, row){
            if (this.changes == 1){
                return res.json("Delete Ok");
            }
            else{
                return res.json("Delete Failed");
            }	
        });
    });
});

app.post('/add-d1/', function(req, res){
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
            // 1MB post limit
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            var post = qs.parse(body);
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

app.post('/add-d2/', function(req, res){
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
            // 1MB post limit
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            var post = qs.parse(body);
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

app.post('/update-d1/', function(req, res){
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
            // 1MB post limit
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            var post = qs.parse(body);
            body = JSON.parse(body);
            db.serialize(function(){
                var stmt = db.prepare("UPDATE Gases"
						+ " SET Country = ?, Pollutant = ?, Year = ?, Value = ?"
						+ " WHERE"
						+ " ID = ?");
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

app.post('/update-d2/', function(req, res){
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
            // 1MB post limit
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            var post = qs.parse(body);
            body = JSON.parse(body);
            db.serialize(function(){
                var stmt = db.prepare("UPDATE Energy"
						+ " SET Time = ?, Demand = ?"
						+ " WHERE"
						+ " ID = ?");
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
    nosql.allDocs({include_docs: true, descending: true}, function(err, doc) {
        return res.json(doc.rows);
    }).catch(function (err) {
        console.log(err);
    });
});

// Get document by id
app.get('/getdoc/:id', function(req, res){
	nosql.get(req.params.id).then(function (doc) {
        return res.json(doc);
    }).catch(function (err) {
        console.log(err);
    });
});

// Add document
app.get('/adddoc', function(req, res){
    nosql.put({
        _id: new Date().toISOString(),
        title: 'Heroes'
    }).then(function (response) {
        return res.json('Add Ok!');
    }).catch(function (err) {
        console.log(err);
    });
});

// Update document, get request /updatedoc?id=todos&title=example
app.get('/updatedoc', function(req, res){
    nosql.get(req.query.id).then(function(doc) {
        return nosql.put({
            _id: req.query.id,
            _rev: doc._rev,
            title: req.query.title
        });
    }).then(function(response) {
        return res.json('Update Ok!');
    }).catch(function (err) {
        console.log(err);
    });
});

// Delete document by id
app.get('/deldoc/:id', function(req, res){
    nosql.get(req.params.id).then(function(doc) {
        nosql.remove(doc);
    }).then(function (result) {
        return res.json('Delete Ok!');
    }).catch(function (err) {
        console.log(err);
    });
});

// Set ip, port of server
app.listen(port, ip);

// Display info of the server
console.log("Web Service running on IP: " + ip + " Port: " + port);