/*
* @fileoverview Default configurations.
*/

/**
* Module dependencies.
*/

var path = require('path');


/**
* Public
*/

module.exports = {
  App: {
    PROTOCOL: 'http',
    HOST: 'localhost',
    PORT: 3000,
    ROOT_DIR: path.join(__dirname, '/..'),
    SECRET: 'argo_f_urself'
  },
  Web:{
    TITLE:'the tile of the website',
    DESCRIPTION:'the description of the website'	
  },
  MongoDB: {
    URL: 'mongodb://localhost/your mongo name'
  },
  LOG: {
    LEVEL: 'info',
    FILE: path.join(__dirname, '../logs/app.log'),
    EMAILFILE: path.join(__dirname, '../logs/app-email.log'),
    ACCESS_FILE: path.join(__dirname, '../logs/app-access.log'),
    EXCEPTION_FILE: path.join(__dirname, '../logs/app-error.log'),
    MAXSIZE: 104857600,
    MAXFILES: 3
  },
  MAIL:{
    USER:'smtp user name', 
    PASS:'smtp password'
  },
  MAILCONTENT:{
    FROM:'email',
    SUBJECT:'email title',
    TEXT:'text version of the email body',
    HTML:'html version of the email body'
	
  }
}
