const express = require('express')
const router = express.Router()

const likeCtrl = require('../controllers/likes')

const auth = require('../middleware/auth')
// const multer = require('../middleware/multer-config')


// router.get('/', auth, sauceCtrl.getAllSauces)

// router.post('/', auth, multer, sauceCtrl.createSauce)

// router.get('/:id', auth, sauceCtrl.getOneSauce)

router.post('/like', auth, likeCtrl.likeSauce)



// router.delete('/:id', auth, sauceCtrl.deleteSauce)

module.exports = router