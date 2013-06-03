/*
	@fileoverview Application creator.
*/

/**
* Module dependencies.
*/

var express = require('express')
  , fs = require('fs')
  , config = require('config')
  , engine = require('ejs-locals')
  , MongoStore = require('connect-mongo')(express)
  , winstonLogger = require('./middlewares/winston_logger')


/**
* Public
*/

exports.create = function() {
  // initialize express
  var app = express()

  // should be placed before express.static
  app.use(express.compress({
    filter: function(req, res) {
      var regexp = /json|text|javascript|css/
      return regexp.test(res.getHeader('Content-Type'))
    },
    level: 9
  }))
  app.use(express.static(config.App.ROOT_DIR + '/public'))

  // set winston logger
  app.use(winstonLogger())

  // set views path, template engine and ejs-locals
  app.set('views', config.App.ROOT_DIR + '/app/views')
  app.set('view engine', 'ejs')
  app.engine('ejs', engine)

  app.configure(function() {
    // cookieParser should be above session
    app.use(express.cookieParser())

    // bodyParser should be above methodOverride
    app.use(express.bodyParser())
    app.use(express.methodOverride())

    // use mongodb as session storage
    app.use(express.session({
      secret: config.App.SECRET,
      store: new MongoStore({url: config.MongoDB.URL})
    }))

    app.use(express.favicon())

    app.use(function(err, req, res, next){
      // error page
      res.status(500).render('500', { error: err.stack })
    })

    // assume 404 since no middleware responded
    app.use(function(req, res, next){
      res.status(404).render('404', { url: req.originalUrl })
    })
    // routes should be at last
    app.use(app.router)
  })
  //
//  app.configure('development', function(){
//    app.use(express.errorHandler())
//  })

  // Initializers
  require('./initializers/mongodb').initialize(app)

  // draw routes
  require('./routes').draw(app)

  return app
}
