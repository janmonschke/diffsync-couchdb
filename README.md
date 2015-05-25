# diffsync-CouchDB

A CouchDB data adapter for [diffsync](https://github.com/janmonschke/diffsync)

## Usage

The CouchDB adapter needs a reference to a database object to write to. This database object is expected to have a [cradle](https://github.com/flatiron/cradle)-like interface. For reading, it uses `get(id, callback)` and for writing it uses `save(id, doc._rev, data, callback)`.

```javascript
  var CouchDBDataAdapter = require('diffsync-couchdb'),
      cradle             = require('cradle'),
      diffsync           = require('diffsync'),

      couchDbAdapter, database, server;

  // set up your CouchDB driver (cradle or cradle-compatible)
  // (...)

  // create a database object
  database = (new cradle.Connection()).database(databaseName)

  // pass it on to the adapter
  couchDbAdapter = new CouchDBDataAdapter(database);

  // pass the adapter to diffsync
  server = new diffsync.Server(couchDbAdapter, socketIO);
```

This adapter assumes that while a document is being edited with diffsync, there is no other manipulating it. Which means, this adapter always overrides the latest version from your database with the latest version from diffsync.

## Example

For a more complete example, check out [diffsync-todos](https://github.com/janmonschke/diffsync-todos).