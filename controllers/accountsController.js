//var DBConnectionStr = "mongodb://52.62.60.102:27017";
//var mongoDrv = require('mongoose');  // get the mongoose driver connection with the MongoDB
var gm = require('./globalModules');
var jwt = require('jwt-simple');
//var userSchema = require('../models/user.js');

//mongoDrv.connect(DBConnectionStr);   // connect to mongoDB

//var UserModel = mongoDrv.model('user', userSchema);

exports.GetUsers = function(req, resp) {
    gm.AccountModel.find({}, function(error, res) {
        if (error) {
            resp.send(500, { error: error });
        } else if (res.length == 0) {
            resp.status(2001).send({ "error" : true, "message" : "no record!" });  //prefer to using resp.status(code).send(msg)
        }
        else {
            resp.send(res);
        }
    });
};

exports.PostUser = function(req, resp) {
    if(!req.body.name || !req.body.password) {
        resp.json({success: false, msg: 'Please pass name and password.'});
    } else {
        /*var newUser = new gm.AccountModel({
            UserName : req.body.name,
            Passowrd : req.body.password
        });*/
        
        var newUser = new gm.AccountModel();
        newUser.UserName = req.body.name;
        newUser.Password = req.body.password;
        newUser.save(function(err){
           if(err) {
                //resp.json({success: false, msg: 'Username already exists.'});
                resp.send(err);
            } else {
                resp.json({success: true, msg: 'Successful created new user.'})
            }            
        });
    }
};

exports.DeleteUser = function(req,resp) {
    gm.AccountModel.findByIdAndRemove({_id: req.params.id},function(err,res){
      if (err){
        resp.send(500, { error: err });
      } else {
          resp.send(res);
      }
         
    });
};

exports.AuthUser = function(req,resp) {
    gm.AccountModel.findOne({
        UserName : req.body.name
    }, function(err,user){
        if (err) {
            resp.send(err);
        } else if (!user) {
            resp.send({success: false, msg: 'Authentication failed. User not found!'});
        } else {
            user.comparePassword(req.body.password, function(err, isMatch){
                if (isMatch && !err) {
                    var token = jwt.encode(user, gm.config.secret);
                    resp.json({success: true, token: 'JWT '+token});
                } else {
                    resp.send({success: false, msg: 'Authentication failed. Wrong password.'});
                } 
            });
        }
    });
}

exports.AccountModel = gm.AccountModel;