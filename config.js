'use strict'
require('dotenv').load();
require('dotenv').config();

module.exports = {
	mailer: {
		service: 'Gmail',
		auth:
		{
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD
		}
	},
	dbConnstring:'mongodb://admin:code4share@ds129484.mlab.com:29484/code4share',
	sessionKey:'HaloCode4Share'
}