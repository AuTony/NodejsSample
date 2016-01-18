var path            = require('path'); //Load 'path' the File base module 
var bodyParser      = require('body-parser');
var express         = require('express'); //Load express module
var morgan          = require('morgan');
var passport        = require('passport');
var config          = require('./config/config');
var custController  = require('./controllers/customerController');
var accountController  = require('./controllers/accountsController');

var app = express(); 				//The Express object

// Use environment defined port or 1688
//var port = process.env.PORT || 1688;
//var communicationPort = 1688;

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

app.get('/', function(req,res){
    res.send('Hello! The API is at http://localhost:'+config.port+'/api. You have to use the following link to login before using it: http://localhost:'+config.port+'/login');
});

require('./controllers/auth')(passport);

var router = express.Router();		//The Express router

// middleware to use for all requests
// can be used for validation for coming request.
router.use(function(req, res, next) {
    // do logging
    console.log('[%s] Request is coming', Date().toString());
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/customer')
    .post(custController.PostCustomer)
    .get(custController.GetCustomers)
    .put(custController.PutCustomer);

router.route('/customer/:id')
    .get(custController.GetCustomer)
    .delete(custController.DeleteCustomer);
    
router.route('/user')
    .post(accountController.PostUser)
    .get(accountController.GetUsers);
        
router.route('/user/:id')
    .delete(accountController.DeleteUser);      
    
router.route('/auth').post(accountController.AuthUser);  
  
app.use('/api', router);  

var server = app.listen(config.port, function () {
    console.log('Example app listening at http://localhost:%s', config.port);
});
