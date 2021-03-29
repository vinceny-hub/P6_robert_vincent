const express = require('express')// framework basé sur node.js
const bodyParser = require('body-parser')// extraction des objets JSON
const mongoose = require('mongoose')// plugin mongoose
const path = require('path')// chemin de fichier
const dotenv = require('dotenv').config()// module servant à masquer les informations de connexion à la base de données
const helmet = require('helmet')
// var session = require('express-session');
var session = require('cookie-session')
// routes
const sauceRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
// connection à MongoDB 
mongoose.connect(process.env.MONGODB_URI,
  { 
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
    })
// expiration des cookies
var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ) // 1 hour
app.use(session({
  name: 'session',
  secret: process.env.DB_PASS,
  // keys: ['key1', 'key2'],
  cookie: { secure: true,
            httpOnly: true,
            domain: 'http://localhost:3000',
            // path: 'foo/bar',
            expires: expiryDate
          }
  })
)
// les requêtes POST sont transformées en objet JSON
app.use(bodyParser.json())
// protection X-XSS -activate a script filter for (XSS) on websites-
app.use(helmet())
// charger les images depuis le dossier 'images'
app.use('/images', express.static(path.join(__dirname,'images')))
//routes Url
app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes)
//export vers server.js
module.exports = app