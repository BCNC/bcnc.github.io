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


// Set up documents
var insertDocuments = function(db, callback) {
    // Get documents collection
    var collection = db.collection('documents');

    // Insert some documents
    collection.insertMany([
            //{a: 1}, {a: 2}, {a: 3}
            { 'first': 'John', 'last': 'Smith', 'phone': '40891191111', 'email': 'email@email.com', 'status': 0, 'accept': 0, 'reject': 0, 'voters': ['test1@gmail.com', 'test2@gmail.com']},
            { 'first': 'John2', 'last': 'Smith2', 'phone': '00091191111', 'email': 'email2@email.com', 'status': 0, 'accept': 0, 'reject': 0, 'voters': ['test1@gmail.com', 'test2@gmail.com'] }
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(2, result.result.n);
        assert.equal(2, result.ops.length);
        console.log("Inserted 2 documents into the collection");
        callback(result);
    });
};

// Set up officers
var insertOfficers = function(db, callback) {
    // get the officers collection
    var collection = db.collection('officers');

    // Insert some officers
    collection.insertMany([
        {'first': 'Bryan', 'last': 'Ngo', 'email': 'bngo@ucdavis.edu'},
        {'first': 'Vincent', 'last': 'Yang', 'email': 'vinyang@ucdavis.edu'},
        {'first': 'Justin', 'last': 'lee', 'email': 'jcdlee@ucdavis.edu'},
        {'first': 'Annie', 'last': 'Tu', 'email': 'anntu@ucdavis.edu'},
        {'first': 'Jia', 'last': 'Yi',   'email': 'jiasitu@ucdavis.edu'},
        {'first': 'Benjamin', 'last': 'Wang', 'email': 'bnwang@ucdavis.edu'},
        {'first': 'Brandan', 'last': 'Nhan', 'email': 'bmnhan@ucdavis.edu'},
        {'first': 'Esther', 'last': 'Kwak', 'email': 'ejkwak@ucdavis.edu'},
        {'first': 'Jacob', 'last': 'Shepherd', 'email': 'jtshepherd@ucdavis.edu'},
        {'first': 'Jamie', 'last': 'Kuang', 'email': 'jamkuang@ucdavis.edu'},
        {'first': 'Jordan', 'last': 'Lim', 'email': 'jolim@ucdavis.edu'},
        {'first': 'Julia', 'last': 'Tien', 'email': 'jsktien@ucdavis.edu'},
        {'first': 'Kelly', 'last': 'Hatamiya', 'email': 'kmhatamiya@ucdavis.edu'},
        {'first': 'Shubhangi', 'last': 'Gulati', 'email': 'sgulati@ucdavis.edu'},
        {'first': 'Yifan', 'last': 'Xu', 'email': 'yifxu@ucdavis.edu'}
        ], function(err, result) {

        assert.equal(15, result.result.n);
        assert.equal(15, result.ops.length);
        console.log("Inserted 15 officers into the colleciton");
        callback(result);
        }
    )

};


/* Selects all the documents */
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


/* Selects all the officers */
var findOfficers = function(db, callback) {

    // get the officers collection
    var collection = db.collection('officers');

    // get all the officers
    collection.find({}).toArray(function(err, officers) {
        assert.equal(err, null);
        console.log("Found the following officers");
        console.log(officers);
        callback(officers);
    })
};


/* Finds specific document */
var filterDocuments = function(condition, db, callback) {

    // Get the documents collection
    var collection = db.collection('documents');

    // Find some documents
    collection.find(condition).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following record with query: " + condition);
        console.log(docs);
        callback(docs);
    });
};

/* Finds specific officer */
var filterOfficers = function(condition, db, callback) {
    // get the officers collection
    var collection = db.collection('officers');

    // find the officer
    collection.find(condition).toArray(function(err, officer) {
        assert.equal(err, null);
        console.log("Found the following officer with the query: " + condition);
        console.log(officer);
        callback(officer);
    })

};

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

   clearAdmins(db, function() {
       insertOfficers(db, function() {

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
