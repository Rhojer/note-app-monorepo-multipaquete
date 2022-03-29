const express = require('express')
const jwt = require('jsonwebtoken') 
const User = require('../module/user.js')
const loginRouter = express.Router()
const bcrypt = require('bcrypt')

loginRouter.post('/', async(req, res)=>{
   const {username, password} = req.body

    const user = await User.findOne({username: username})
    const token = user === null 
    ? res.status(401).json({error: 'usuario o clave invalido'})
    : await bcrypt.compare( password, user.passwordHash)
    ? await jwt.sign({user}, 'secret', { expiresIn: '1h' })
    : res.status(401).json({error: 'usuario o clave invalido'})
   const data ={username: user.username, name:user.name,token
   }
    res.json(data)
})

module.exports = loginRouter