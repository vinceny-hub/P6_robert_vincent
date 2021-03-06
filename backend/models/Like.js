const mongoose = require('mongoose')


const likeSchema = mongoose.Schema({
   
    likes: {type:Number},
    // userId:[{type: String}] 

    
   
  })

module.exports = mongoose.model('Like', likeSchema);