var DBConnectionStr = "mongodb://52.62.60.102:27017";
var mongoDrv = require('mongoose');  // get the mongoose driver connection with the MongoDB
var custSchema = require('../models/customer.js');

mongoDrv.connect(DBConnectionStr);   // connect to mongoDB

var CustModel = mongoDrv.model('customer', custSchema);

exports.GetCustomer = function(req, resp) {
    CustModel.find({"GivenName": req.params.GivenName}, function(error, res) {
        if (error) {
            resp.send(500, { error: error });
        } else if (res.length == 0) {
            resp.status(2001).send({ "error" : true, "message" : "no record!" });  //prefer to using resp.status(code).send(body)
        }
        else {
            resp.send(res);
        }
    });
};

exports.GetCustomers = function(req, resp) {
    CustModel.find({}, function(error, res) {
        if (error) {
            resp.send(500, { error: error });
        } else if (res.length == 0) {
            resp.status(2001).send({ "error" : true, "message" : "no record!" });  //prefer to using resp.status(code).send(body)
        }
        else {
            resp.send(res);
        }
    });
};

// create endpoint /api/customer for POST
exports.PostCustomer = function(req, res) {
    // create a new object of customer model
    var customer = new CustModel();
    
    // set the customer properties that came from the POST data
    customer.Title = req.body.Title;
    customer.GivenName = req.body.GivenName;
    customer.MiddleName = req.body.MiddleName;
    customer.Surname = req.body.Surname;
    customer.Education = req.body.Education;
    customer.Email = req.body.Email;
    customer.Phone.push({
        PhoneName: req.body.PhoneName1,
        PhoneNumber: req.body.PhoneNumber1
    });
    customer.Phone.push({
        PhoneName: req.body.PhoneName2,
        PhoneNumber: req.body.PhoneNumber2        
    });
   
    customer.save(function(err) {
        if (err)
            res.send(err);
        
        res.json({ message: 'customer is added to database', data: customer});
    });
};

// create endpoint /api/customer/:GivenName for DELETE
exports.DeleteCustomer = function(req,resp) {
    CustModel.remove({"GivenName": req.params.GivenName},function(err,res){
      if (err){
        resp.send(500, { error: err });
      } else {
          resp.send(res);
      }
         
    });
};

// create endpoint /api/customer/:GivenName for PUT
exports.PutCustomer = function(req,resp) {
    CustModel.findOneAndUpdate({"GivenName": req.body.GivenName}, req.body, {new: true},function(error, cust) {
        if (error) {
            resp.send(500, { error: error });
        } else if (cust.length == 0) {
            resp.status(2001).send({ "error" : true, "message" : "no record!" });  //prefer to using resp.status(code).send(body)
        } else {
            resp.send(req.body);
        }       
    });
}

exports.CustModel = CustModel;