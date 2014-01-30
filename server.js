var express = require('express')
  , fs = require('fs')
  , mongoose = require('mongoose')


var env = process.env.NODE_ENV || 'development'
  , config = require('./app/config/config')[env];


mongoose.connect(config.db, config.dbOptions);

mongoose.connection.on('error', function(err) {
  console.log(err);
});

mongoose.connection.on('disconnected', function() {
  mongoose.connect(config.db, config.dbOptions);
});


fs.readdirSync('./app/models').forEach(function(file){
  if (~file.indexOf('.js')) require('./app/models/' + file)
});


var app = express();

require('./app/config/express')(app, config);
require('./app/routes')(app);


app.listen(config.port, function(err) {
  if (err) return console.log(err);
  console.log('Express app started on port %s', config.port)
});