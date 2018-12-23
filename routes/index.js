var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var config = require('../config');
var transporter = nodemailer.createTransport(config.mailer);

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'code4share - a flatform for sharing code' });
});
router.get('/about', function(req, res, next) {
	res.render('about',{title: 'code4share - a flatform for sharing code'});
});
router.route('/contact')
.get(function(req, res, next) {
	res.render('contact',{title: 'code4share - a flatform for sharing code'});
})
.post(function(req,res,next) {
	req.checkBody('name','Empty name').notEmpty();
	req.checkBody('email','invalid email').isEmail();
	req.checkBody('message','Empty message').notEmpty();
	var err = req.validationErrors() ;
	if(err)
	{
		res.render('contact',{
			title: 'code4share - a flatform for sharing code',
			name: req.body.name,
			email: req.body.email,
			message: req.body.message,
			errorMessages:err
		})
	}else{
		var mailOptions = {
			from: 'Code4Share <no-reply@code4share.com>',
			to: 'Code4Share <no-reply@code4share.com>',
			subject: 'You get a new message from visitor 😘 😘 ',
			text: req.body.message

		};
		transporter.sendMail(mailOptions,function(err,info){
			if(err)
			{
				return console.log(err);
			}
			res.render('thanks',{title: 'code4share - a flatform for sharing code'});
		});
	}
});

module.exports = router;
