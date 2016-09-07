var mongodb = require('mongodb');
var server = new mongodb.Server("10.10.30.253", 27017, {});
var db =  new mongodb.Db('visualization', server, {});

db.open(function (error, client) {
  if (error) throw error;
  db.collection("actionmetrics", function(err, collection) {
    collection.find({}, {limit:10}).toArray(function(err, docs) {
      console.dir(docs);
    });
  });
});
