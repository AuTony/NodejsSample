var path = require('path'); //Load 'path' the File base module 
var bodyParser = require('body-parser');
var express = require('express'); //Load express module
var custController = require('./controllers/CustomerController');
//var custSchema = require('./models/customer')

var app = express(); 				//The Express object
// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

//app.use(require('connect').bodyParser());

app.use(bodyParser.json());

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

router.route('/customer/:GivenName')
    .get(custController.GetCustomer)
    .delete(custController.DeleteCustomer);
  //.put(custController.putBeer)
  //.delete(beerController.deleteBeer);*/
  
 /*router.route('/customer')
    .post(function(req,res){
        var cust = new custController.CustModel();
        cust.Title = req.body.Title;
        cust.GivenName = req.body.GivenName;
        cust.MiddleName = req.body.MiddleName;
        cust.Surname = req.body.Surname;
        cust.Education = req.body.Education;
        cust.Email = req.body.Email;
    
        cust.save(function(err) {
        if (err)
            res.send(err);
        
        res.json({ message: 'customer is added to database', data: req.body});
    })
    })
    .get(function(req, resp) {
        custController.CustModel.find({}, function(error, res) {
        if (error) {
            resp.send(500, { error: error });
        } else if (res.length == 0) {
            resp.status(2001).send({ "error" : true, "message" : "no record!" });  //prefer to using resp.status(code).send(body)
        }
        else {
            resp.send(res);
        }
    });
    });*/
  
app.use('/api', router);  

// Use environment defined port or 1688
//var port = process.env.PORT || 1688;
var communicationPort = 1688;

var server = app.listen(communicationPort, function () {
    var port = server.address().port;
    console.log('Example app listening at http://localhost:%s', port);
});
