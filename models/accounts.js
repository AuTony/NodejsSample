var mongoDrv = require('mongoose');
var bcrypt = require('bcrypt');

var accountSchema = new mongoDrv.Schema({
    UserName: {type: String, unique: true, required: true},
    Password: {type: String, required: true}
});

// Execute before each user.save() call
accountSchema.pre('save', function(callback){
    var user = this;
    if(!user.isModified('password') && !user.isNew) return callback();
    bcrypt.genSalt(10, function(err, salt){
        if (err) return callback(err);
        bcrypt.hash(user.Password, salt, function(err, hash){
            if (err) return callback(err);
            user.Password = hash;
            callback();
        });
    });
});

// Special comparation for salt password
accountSchema.methods.comparePassword = function(pwd,cb){
    bcrypt.compare(pwd, this.Password, function(err,isMatch){
        if(err)
            return cb(err);
        cb(null, isMatch);
    });
};

module.exports = accountSchema;