const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const { response } = require('../app')
const User = require('../models/User')
const MaskData = require('maskdata');
// const myForm = require('../../frontend/src/app/auth/signup/signup.component')
// let myFormPass = myForm.getElementById('password')


  

exports.signup = (req, res, next) => {

    let pass = req.body.password
    let mail = req.body.email
    let regPass = new RegExp ('[0-9a-fA-F]{6}')
    let regMail = new RegExp ('')
    if (pass.match(regPass) && mail.match(regMail)) {
  
   
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const maskJSONOptions = { maskWith: "*", fields: ['email','password']};
        const user = new User({
            email: req.body.email,
            password: hash
        })
        // const ep = {
        //     email:req.body.mail
        // }
        const maskedSignup = MaskData.maskJSONFields(user, maskJSONOptions) 
        console.log(maskedSignup)
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }))
    })
    
    .catch(error => res.status(500).json({ error }))


}else
//  myFormPass = myForm.getElementById('password')
//  myFormPass.innerHTML = 'passError'
// return 
res.status(430).json('invalid')

//  res.status(401).json({ message: 'problème !' })
//  myForm.alert('error')

 
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })

    .then(user => {
        const maskJSONOptions = { maskWith: "*", fields: ['email','password']};
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' })
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                // const maskJSONOptions = { maskWith: "*", fields: ['password']};
            
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

