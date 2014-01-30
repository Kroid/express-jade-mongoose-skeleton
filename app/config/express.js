var express = require('express')
  , mongoose = require('mongoose')
  , MongoStore = require('connect-mongo')(express)
  , env = process.env.NODE_ENV || 'development';


module.exports = function(app, config) {
  app.use(express.favicon());

  app.use(express.static(config.rootPath + '/public'));

  if (env == 'development') {
    app.use(express.logger('dev'));
  }

  app.use(express.json());
  app.use(express.urlencoded());

  app.use(express.cookieParser());

  app.use(express.session({
    secret: config.sessionSecret,
    key: 'sid',
    cookie: {
      path: '/',
      httpOnly: 'true',
      maxAge: null
    },
    store: new MongoStore({ mongoose_connection: mongoose.connection })
  }));

  app.use(app.router);

  app.use(function(req, res) {
    res.send(404);
  })
  
  app.set('views', config.rootPath + '/app/views');
  app.set('view engine', 'jade');
}