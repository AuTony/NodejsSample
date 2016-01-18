var config = require('../config/config');
exports.config = config;

var mongoDrv = require('mongoose');  
mongoDrv.connect(config.database);   // connect to mongoDB

var custSchema = require('../models/customer.js');
exports.CustModel = mongoDrv.model('customer', custSchema);

var accSchema = require('../models/accounts.js');
exports.AccountModel = mongoDrv.model('accounts', accSchema);
