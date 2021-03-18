const mongoose = require('mongoose')

// schéma de données du formulaire sauce
const sauceSchema = mongoose.Schema({
  
  name: { type: String, required: true, unique: true},
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  mainPepper: { type: String, required: true },
  heat: { type: Number, required: true },
  userId: { type: String, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: [String] },
  usersDisliked: { type:[String] }
   
  })

module.exports = mongoose.model('Sauce', sauceSchema);


