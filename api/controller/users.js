const mongoose = require('mongoose')
const User = require ('../module/user.js')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const res = require('express/lib/response')

userRouter.get('/', (req, res)=>{
    User.find({}).populate('notes', {
        content: 1,
        date: 1
    })
    .then(result=> res.json(result))
})

userRouter.post('/', async (req, res)=>{
const {username, name, password} = req.body
try{
const user = new User({
    username,
    name,
    passwordHash: await bcrypt.hash(password,10),

})
saveUser = await user.save()

res.json(saveUser)
}catch(e){
    res.status(400).json(e.message)
}
})

module.exports = userRouter