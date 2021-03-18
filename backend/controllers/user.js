const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const MaskData = require('maskdata')

exports.signup = (req, res, next) => {
    //contrainte de mot-de-passe regExp
    let mail = req.body.email
    let pass = req.body.password
    let regMail = new RegExp ('')
    let regPass = new RegExp ('[0-9a-fA-F]{6}')
    if (mail.match(regMail) && pass.match(regPass)) {
    //cryptage du mot-de-passe
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        //masquage des données de connection
        const maskJSONOptions = { maskWith: "*", fields: ['email','password']}
        const user = new User({
            email: req.body.email,
            password: hash
        })
   
        const maskedSignup = MaskData.maskJSONFields(user, maskJSONOptions) 
        console.log(maskedSignup)
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }))
    })
    
    .catch(error => res.status(500).json({ error }))


}else

res.status(430).json({ error })
 
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })

    .then(user => {
        //masquage des donnés de mot-de-passe
        const maskJSONOptions = { maskWith: "*", fields: ['email','password']};
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' })
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                          
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' })
                }
                res.status(200).json({
                   
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' },
                    )
                })
                const maskedLogin = MaskData.maskJSONFields(user, maskJSONOptions) 
                console.log(maskedLogin,'user masqué')
            })
            .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }));
}

