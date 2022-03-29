const jwt = require('jsonwebtoken')
const authRouter = require('express').Router()

authRouter.post('/', async(req, res) =>{

    const authorization = req.get('Authorization')
    try{
      if(authorization === null){
        res.status(401).json({error: 'invalid token or token not found'})
      }
    const decodedToken = await wt.verify(authorization, 'secret')
   
    if(!decodedToken || !authorization){
        res.status(401).json({error: 'invalid token or token not found'})
    }
    
} catch(e){
  res.json(e)
}
}
)

module.exports = authRouter