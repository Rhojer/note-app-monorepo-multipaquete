const jwt = require('jsonwebtoken')
module.exports  = (req, res, next) =>{
    const authorization = req.get('Authorization')
      if(authorization === null){
        res.status(401).json({error: 'invalid token or token not found'})
      }
    const decodedToken = jwt.verify(authorization, 'secret')
   
    if(!decodedToken || !authorization){
        res.status(401).json({error: 'invalid token or token not found'})
    }
        req.body.userId = decodedToken.user.id
      
    next()
}
