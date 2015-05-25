var CouchDBDataAdapter = function(database){
  if(!database){ throw new Error('Need to specify a database'); }
  this.database = database;
};

CouchDBDataAdapter.prototype.getData = function(id, callback){
  this.database.get(id, callback);
};

CouchDBDataAdapter.prototype.storeData = function(id, data, callback){
  // we override the document in any way
  delete data._rev;

  this.database.get(id, function(err, doc){
    // return with error
    if(err && callback){ return callback(err); }

    // override the document with the current state
    this.database.save(id, doc._rev, data, callback);
  }.bind(this));
};

module.exports = CouchDBDataAdapter;
