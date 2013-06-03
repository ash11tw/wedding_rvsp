var nodemailer = require('nodemailer')
  , config = require('config')
  , transport = nodemailer.createTransport('SMTP',{
	//	service:'Gmail'
		 auth:{
			user: config.MAIL.USER
			, pass: config.MAIL.PASS
		}
			
	})
   , winston = require('winston')
  , loggerTransports = require('./logger').loggerTransports
winston.loggers.add('email',{
  transports: [
    new winston.transports.Console(loggerTransports.console),
    new winston.transports.File(loggerTransports.emailfile)
  ]
})
var logger = winston.loggers.get('email')
module.exports.send = function(mail,cb){
	logger.info('email send to '+mail.to)
	return transport.sendMail(mail,cb)
}
