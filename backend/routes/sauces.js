//routes sauces 

//router express
const express = require('express')
const router = express.Router()

//import depuis controllers/sauces
const sauceCtrl = require('../controllers/sauces')

//import depuis les middlewares auth et multer-config
const auth = require('../middleware/auth')//authentification JsonWebToken
const multer = require('../middleware/multer-config')//gestion des images

router.get('/', auth, sauceCtrl.getAllSauces)

router.post('/', auth, multer, sauceCtrl.createSauce)

router.get('/:id', auth, sauceCtrl.getOneSauce)

router.put('/:id', auth, multer, sauceCtrl.modifySauce)

router.delete('/:id', auth, sauceCtrl.deleteSauce)

router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router

