/*
*	@fileoverview URL routes.
*/


/**
* Module dependencies.
*/

var  config = require('config')
  , filter = require('./middlewares/routing_filter')


/**
* Public
*/

exports.draw = function(app) {
  // top routes
  var home = require(config.App.ROOT_DIR + '/app/controllers/home')
  app.get('/', home.index)

  app.post('/save',home.save)
  app.get('/load',home.load)  
}
