const jwt = require('jsonwebtoken');

// le TOKEN et l'ID de l'utilisateur sont vérifié (match ou non)
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //second element du header authorization
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');//vérification  du token
    const userId = decodedToken.userId;//verification de l'utilisateur
    if (req.body.userId && req.body.userId !== userId) {//match ou pas
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};