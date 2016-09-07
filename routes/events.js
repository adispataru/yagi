var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = require('bson').BSONPure;

const util = require('util');
var server = new Server('192.168.1.61', 27017, {auto_reconnect: true});
db = new Db('visualization', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'visualization' database");
        db.collection('actionmetrics', function(err, collection) {
            if (err) {
                console.log("The 'actionmetrics' collection doesn't exist.");
            }
        });
    }else{
        console.log("Cannot connect to db");
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving event: ' + id);
    db.collection('actionmetrics', function(err, collection) {
      if(!err){
        collection.find({'id':id}).toArray(function(err, items) {
            res.send(items);
        });
      }else{
        console.log(err);
      }
    });
};

exports.findByRole = function(req, res) {
    var role = req.params.role;
    console.log('Retrieving events by role: ' + role);
    db.collection('actionmetrics', function(err, collection) {
      if(!err){
        collection.find({'role':role}).toArray(function(err, items) {
            res.send(items);
        });
      }else{
        console.log(err);
      }
    });
};

exports.findAll = function(req, res) {
    db.collection('actionmetrics', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
