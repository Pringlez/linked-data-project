// Import required modules
var express = require('express');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

var port = 8000;

// Create a HTTP server
var app = express();

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
  
    /*db.each("SELECT * FROM Gases", function(err, row) {
      console.log("ID :" + row.ID + " Pollutant: " + row.Pollutant);
    });*/
    
    /*db.each("SELECT * FROM Energy", function(err, row) {
      console.log("ID :" + row.ID + " Time: " + row.Time + " Demand: " + row.Demand);
    });*/
 });

app.get('/', function(req, res) {
    res.json({ message: 'Linked-Data-API Working!' });
});

app.get('/get-d1', function(req, res) {
    res.json(data1);
});

app.get('/get-d2', function(req, res){
	res.json(data2);
});

app.get('/get-d1/:id', function(req, res){
    db.serialize(function(){
        db.each(
            "SELECT * FROM Gases WHERE ID = " + req.params.id, 
            function(err, row) {
                var gasinfo  = new Gas(row.ID , row.Country, row.Pollutant, row.Year, row.Value);
                return res.json(gasinfo);
        });
    });
});

app.get('/get-d2/:id', function(req, res){
	db.serialize(function(){
        db.each(
            "SELECT * FROM Energy WHERE ID = " + req.params.id, 
            function(err, row) {
                var energyinfo = new Energy(row.ID , row.Time, row.Demand);
                return res.json(energyinfo);
        });
    });
});

app.get('/del-d1/:id', function(req, res){
    var gas = new Gas(req.params.id);
    db.serialize(function(){
        var stmt = db.prepare("DELETE FROM Gases WHERE ID = ?");
        stmt.run(gas.ID, function(err, row){
            if (this.changes == 1){
                return res.json("OK");
            }
            else{
                return res.json("Error");
            }	
        });
    });
});

app.get('/del-d2/:id', function(req, res){
	var energy = new Energy(req.params.id);
    db.serialize(function(){
        var stmt = db.prepare("DELETE FROM Energy WHERE ID = ?");
        stmt.run(energy.ID, function(err, row){
            if (this.changes == 1){
                return res.json("OK");
            }
            else{
                return res.json("Error");
            }	
        });
    });
});

app.post('/add-d1/', function(req, res){
	data1.push(req.body.addition);
	res.json(data1);
});

app.post('/add-d2/', function(req, res){
	data2.push(req.body.addition);
	res.json(data2);
});

var server = app.listen(port);

console.log("Web Service running on localhost:" + port);