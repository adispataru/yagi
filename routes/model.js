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
        db.collection('clmodel', function(err, collection) {
            if (err) {
                console.log("The 'clmodel' collection doesn't exist.");
            }
        });
    }else {
        console.log("Cannot connect to db.." + err);
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving component: ' + id);
    db.collection('clmodel', function(err, collection) {
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
    console.log('Retrieving components by role: ' + role);
    db.collection('clmodel', function(err, collection) {
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
    db.collection('clmodel', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findLastCM = function(req, res) {
    db.collection('clmodel', function(err, collection) {
        collection.find({'role':"CellManager"}).toArray(function(err, items) {
            var l = items.length;
            console.log("Cell Managers: " + l);
            res.send(items[l - 1]);
        });
    });
    res.send(null);
};
