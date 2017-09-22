// https://mongodb.github.io/node-mongodb-native/2.2/quick-start/
//
// required modules
//
// main function that handles the query part of input
// function queryServer(request, response, search)

//Make queryServer function visible outside this module
//exports.queryServer = queryServer;

var MongoClient = require('mongodb').MongoClient;
assert = require('assert');

// Connection url
var url = 'mongodb://localhost:27017/BlackHawk';


// Inserts many documents
var insertDocuments = function(db, callback) {
    // Get documents collection
    var collection = db.collection('documents');

    // Insert some documents
    collection.insertMany([
            //{a: 1}, {a: 2}, {a: 3}
            { 'first': 'John', 'last': 'Smith', 'phone': '40891191111', 'email': 'email@email.com', 'status': 0, 'accept': 0, 'reject': 0},
            { 'first': 'John2', 'last': 'Smith2', 'phone': '00091191111', 'email': 'email2@email.com', 'status': 0, 'accept': 0, 'reject': 0 }
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(2, result.result.n);
        assert.equal(2, result.ops.length);
        console.log("Inserted 2 documents into the collection");
        callback(result);
    });
};

// Set up officers
var insertAdmins = function(db, callback) {
    // get the officers collection
    var collection = db.collection('officers');

    // Insert some officers
    collection.insertMany([
        {'first': 'Bryan', 'last': 'Ngo', 'email': 'bngo@ucdavis.edu'},
        {'first': 'Vincent', 'last': 'Yang', 'email': 'vinyang@ucdavis.edu'},
        {'first': 'Justin', 'last': 'lee', 'email': 'jcdlee@@ucdavis.edu'},
        {'first': 'Annie', 'last': 'Tu', 'email': 'anntu@ucdavis.edu'},
        {'first': 'Jia', 'last': 'Yi', 'email': 'jiasitu@ucdavis.edu'}
        ], function(err, result) {

        assert.equal(5, result.result.n);
        assert.equal(5, result.ops.length);
        console.log("Inserted 2 officers into the colleciton");
        }
    )

};

var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};

var findOfficers = function(db, callback) {
    // get the officers collection
    var collection = db.collection('officers');

    collection.find({}).toArray(function(err, docs) {
        console.log("Found the following officers");
        console.log(docs);
        callback(docs);
    })
}

var filterDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Find some documents
    collection.find({'a': 3}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records with query 'a':3");
        console.log(docs);
        callback(docs);
    });
}

var updateDocument = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Update document where a is 2, set b to 1
    collection.updateOne( { a : 2 },
            { $set: { b : 1 } }, function(err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                console.log("Updated the document with the field a equal to 2");
                callback(result)
            });
};

var removeDocument = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Delete some documents
    collection.deleteOne({ a : 3  }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the document with the field a equal to 3");
        callback(result);
    });
};

var clearDocument = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Delete some documents
    collection.remove({}, function(err, result) {
        assert.equal(err, null);
        callback(result);
    });
};

var clearAdmins = function(db, callback) {
    // get the officers collection
    var collection = db.collection('officers');

    // delete the officers
    collection.remove({}, function(err, result) {
        assert.equal(err, null);
        callback(result)
    });
};

var indexCollection = function(db, callback) {
    db.collection('documents').createIndex(
            { "first": 'john' },
            null,
            function(err, results) {
                console.log(results);
                callback();
            });
};

// insert
MongoClient.connect(url, function(err, db) {

   clearDocument(db, function() {
       clearAdmins(db, function() {
           insertDocuments(db, function() {
               findDocuments(db, function() {
                   insertAdmins(db, function() {
                       assert.equal(null, err);
                       db.close();
                   });
               });
           });
       });
   });
});

// delete 
// MongoClient.connect(url, function(err, db) {
//    clearDocument(db, function() {
//        findDocuments(db, function() {
//                assert.equal(null, err);
//                db.close();
//        });
//    });
// });

// Use connect method to connect to server
//MongoClient.connect(url, function(err, db) {
//    assert.equal(null, err);
//    console.log("connected successfully to server");
//
//    insertDocuments(db, function() {
//        findDocuments(db, function() {
//
//            assert.equal(null, err);
//            updateDocument(db, function() {
//                findDocuments(db, function() {
//
//                   assert.equal(null, err);
//                   clearDocument(db, function() {
//                       findDocuments(db, function() {
//                           db.close();
//                       });
//                   });
//                });
//            });
//        });
//    });
//});
var insert = function(first, last, phone, email) {
    console.log(first);
    var info = { 'first': first,
                'last': last,
                'phone': phone,
                'email': email};
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocuments(info, db, function() {
            db.close();
        });
    });
};
var all = function(callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findDocuments(db, function(result) {
            db.close();
            if (callback){
                callback(result);
            }
        });
    });
};
