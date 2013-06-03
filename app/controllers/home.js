/*
*	@fileoverview Top page.
*/
var mongoose = require('mongoose')
	, Guest = mongoose.model('Guest')
	, mail = require('../../libs/email')
	, logger = require('../../libs/logger').logger
	, config = require('../../config/default')
/**
* GET /home
*/
exports.index = function(req, res) {
  res.render('home', {title: config.Web.TITLE,description:config.Web.DESCRIPTION})
}

exports.save = function(req,res){
	var guest = new Guest(req.body)
	guest.save(function(err){
		var mailoption
		if (err){
			logger.error(err)
			res.render('500',{ error: err })
			return
		}
		if (req.body.email){
			mailoption = {
				'from':config.MAILCONTENT.FROM
				, 'to':req.body.email
				, 'subject':config.MAILCONTENT.SUBJECT
				, 'text':config.MAILCONTENT.TEXT
				, 'html':config.MAILCONTENT.HTML
			}
			mail.send(mailoption,function(err){
				if (err){
					logger.error(err.message)
					res.render('500', { error: err.message })
					return
				}
				logger.info('send email to '+req.body.email)
			})
		}
		res.json({success:true})
	})	
}

exports.load = function(req,res){
	Guest.find().lean().exec(function(err,data){
		if (err){
			logger.error(err)
			res.render('500', { error: err})
			return
		}
		res.json(data)
	})
}
