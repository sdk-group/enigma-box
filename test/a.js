global._ = require('lodash');
global.Promise = require('bluebird');
global.Couchbird = require('Couchbird')({
		server_ip: '194.226.171.100'
	})
	.bucket('rdf');