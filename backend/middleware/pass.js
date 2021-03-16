const MaskData = require('./maskdata');
const User = require('../models/User')
const emailMask2Options = {
    maskWith: "*", 
    unmaskedStartCharactersBeforeAt: 3,
    unmaskedEndCharactersAfterAt: 2,
    maskAtTheRate: false
};

// const email = "my.test.email@testEmail.com";

const maskedEmail = MaskData.maskEmail2(User, emailMask2Options);
