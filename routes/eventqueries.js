var fs = require('fs');
var util = require('util');
var mongodb = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
assert = require('assert');

// Connection url
var url = 'mongodb://localhost:27017/BlackHawk';

// Inserts many documents
var insertEvent = function(info, db, callback) {
    // Get documents collection
    var collection = db.collection('events');
    // Insert some documents
    collection.insertMany([
        info
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        assert.equal(1, result.ops.length);
        console.log("Inserted 1 documents into the collection");
        callback(result);
    });
};

/* Select all events */
var findEvents = function(db, callback) {

    // Get the documents collection
    var collection = db.collection('events');
    // Find all events in sorted order based on date
    collection.find({}).sort({date: 1}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};


/* Select specific event */
var filterEvents = function(condition, db, callback) {

    // Get the documents collection
    var collection = db.collection('events');

    // Find some documents
    collection.find(condition).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found specific event(s) with condition " + condition);
        console.log(docs);
        callback(docs);
    });
};


/* Update a row with some new data */
var updateEvent = function(info, key, db, callback) {
    // Get the documents collection
    var collection = db.collection('event');

    console.log("Updating a single event...");

    // Update event where id
    collection.updateOne(
        { _id : key}, // filter
        { $set: info }, // data
        { upsert: true }, // insert if event not found

        function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            callback(result)
        });
};

/* Delete one event based on ID */
var removeDocument = function(item, db, callback) {
    // Get the documents collection
    var collection = db.collection('events');
    // Delete some documents
    collection.deleteOne(
        { _id : item  }, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Removed the event with the field _id equal to " + item);
            callback(result);
        });
};

/* Delete all events */
var clearEvents = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('events');
    // Delete some documents
    collection.remove({}, function(err, result) {
        assert.equal(err, null);
        callback(result);
    });
};

/* Indexing - currently unused; implement when scaling is needed */
var indexCollection = function(db, callback) {
    db.collection('events').createIndex(
        { "a": 1 },
        null,
        function(err, results) {
            console.log(results);
            callback();
        });
};

/* Wrapper function to insert data externally */
var insert = function(info) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertEvent(info, db, function() {
            db.close();
        });
    });
};

/* Wrapper function to update data externally */
var update = function(info, key) {

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        updateEvent(info, key, db, function() {
            db.close();
        });
    });
};

/* Wrapper function to remove a single document */
var removeOne = function(filename, callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        removeDocument(filename, db, function(result) {
            if(callback) {
                callback('The document has been removed.');
            }
            db.close();
        });
    });
};

/* Wrapper function to get all data externally */
var all = function(callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findEvents(db, function(result) {
            db.close();
            if (callback){
                callback(result);
            }
        });
    });
};

/* Wrapper function returns a single document */
var filter = function(condition, callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        filterEvents(condition, db, function(result) {
            db.close();
            if (callback){
                callback(result);
            }
        });
    });
};


exports.allEvents = all;
exports.insertEvent = insert;
exports.filter = filter;
exports.updateEvent = update;
exports.removeOneEvent = removeOne;

