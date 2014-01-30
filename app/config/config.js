var path = require('path');

module.exports = {
  development: {
    db: 'mongodb://localhost/testdb',
    dbOptions: {
      server: { socketOptions: { keepAlive: 1 } }
    },
    port: 3000,
    rootPath: path.normalize(__dirname + '/../../'),
    sessionSecret: 'secret'
  },
  test: {},
  production: {}
};