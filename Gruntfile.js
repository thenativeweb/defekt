'use strict';

const tourism = require('tourism');

module.exports = tourism({
  analyse: {
    server: [ '**/*.js', '!node_modules/**/*.js', '!coverage/**/*.js' ],
    options: {
      server: {
        language: 'es2015'
      }
    }
  },
  test: {
    server: [ 'test/**/*.js' ]
  }
});
