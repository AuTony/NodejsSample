var mongoDrv = require('mongoose');
var Schema = mongoDrv.Schema;

// To do: phone type mapping / Social Type mapping / Membership mapping / Preference mapping
var phoneSchema = new Schema({
    PhoneName: {type: String, require: true},         // e.g. Home Phone / Mobile 
    CountryCode: {type: String, require: false},       // e.g. +61
    PhoneNumber: {type: String, require: true}
});

var SocialAccountSchema = new Schema({
    SocialName: {type: String, require: true},      // e.g. facebook, google, twitter, QQ, WeChat, LinkedIn
    AccountID: {type: String, require: true}
});

var AddressSchema = new Schema({
    AddrType: {type: String, require: true},        // e.g. Home / Office / School / Delivery Address
    UnitNumber: {type: String, require: false},
    BuildingName: {type: String, require: false},
    StreetNumber: {type: String, require: true},
    StreetName: {type: String, require: true},
    CityName: {type: String, require: false},
    Suburb: {type: String, require: true},
    State: {type: String, require: true},
     PostalCode: {type: String, require: true},
     Country: {type: String, require: true},
     Region: {type: String, require: false}          // e.g. Asia-Pacific
});

var customerSchema = new Schema({
    CustUID: {type: String, require: false},
    Title: {type: String, require: true},               // e.g. Mr., Mrs., Ms., Miss
    GivenName: {type: String, require: true},
    MiddleName: {type: String, require: false},
    Surname: {type: String, require: true},
    Education: {type: String, require: false}, 
    DOB: {type: Date, require: false},
    Email: {type: String, require: false},
    Phone: [phoneSchema],
    SocialAccount: [SocialAccountSchema],
    Addresses: [AddressSchema],
    Source: {type: String, require: false},
    CreateAt: {type: Date, require: true},
    LastModified: {type: Date, require: false}
});

// Export the model
module.exports = customerSchema;//mongoDrv.model('Customer', customerSchema);
