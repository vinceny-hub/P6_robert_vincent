const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// const validator = require('validator')

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)

// *******************************************************

// var passwordValidator = require('password-validator');
 
// // Create a schema
// var passSchema = new passwordValidator();
 
// // Add properties to it
// passSchema
// .is().min(8)                                    // Minimum length 8
// .is().max(100)                                  // Maximum length 100
// .has().uppercase()                              // Must have uppercase letters
// .has().lowercase()                              // Must have lowercase letters
// .has().digits(2)                                // Must have at least 2 digits
// .has().not().spaces()                           // Should not have spaces
// .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
 
// // Validate against a password string
// console.log(passSchema.validate('validPASS123'));
// // => true
// console.log(passSchema.validate('invalidPASS'));
// // => false
 
// // Get a full list of rules which failed
// console.log(passSchema.validate('joke', { list: true }));
// // => [ 'min', 'uppercase', 'digits' ]

// const passSchema = require('../models/password');

 

