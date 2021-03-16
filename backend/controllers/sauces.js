const Sauce = require('../models/Sauce')
const fs = require('fs')

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked:[] 


    })
    sauce.save()
    .then(() => res.status(201).json({message: 'sauce enregistrée !'}))
    .catch(error => res.status(400).json({error}))
}

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }: {...req.body}
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
    .then(sauce => res.status(200).json({message:'sauce modifié !'}))
    .catch(error => res.status(400).json({ error }))
}

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
            .catch(error => res.status(400).json({ error }))
        })
      })
      .catch(error => res.status(500).json({ error }))
  }

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}))
}

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(404).json({error}))
}

// **************************************************************


exports.likeSauce = (req, res, next) => {
  
  let like = req.body.like
  let userId = req.body.userId
  let objectId = req.params.id

  // Sauces.findOne({ _id: req.params.id })
  //         .then((sauce) => {}

  if (like === 1) { 
    Sauce.updateOne({
        _id: objectId }, 
      {
        $push: {
          usersLiked: userId },
        $inc: {
          likes: +1 },
      })
      .then(() => res.status(200).json({ message: 'I like it !' }))
      .catch((error) => res.status(400).json({ error }))
  }
  if (like === -1) {
    Sauce.updateOne(
        {
          _id: objectId }, 
          {
          $push: {
            usersDisliked: userId },
          $inc: {
            dislikes: +1 }, 
        }
      )
      .then(() => {
        res.status(200).json({ message: 'I don\'t like it !' })
      })
      .catch((error) => res.status(400).json({
        error
      }))
  }
  if (like === 0) { 
    Sauce.findOne({
        _id: objectId
      })
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) { 
          Sauce.updateOne({
              _id: objectId }, 
              {
              $pull: {
                usersLiked: userId },
              $inc: {
                likes: -1 }, 
            })
            .then(() => res.status(200).json({ message: 'Unliked !' }))
            .catch((error) => res.status(400).json({ error }))
        }
        if (sauce.usersDisliked.includes(userId)) {
          Sauce.updateOne({
              _id: objectId }, 
              {
              $pull: {
                usersDisliked: userId },
              $inc: {
                dislikes: -1 },
            })
            .then(() => res.status(200).json({ message: 'UndisLiked !' }))
            .catch((error) => res.status(400).json({ error }))
        }
      })
      .catch((error) => res.status(404).json({ error }))
  }
}

