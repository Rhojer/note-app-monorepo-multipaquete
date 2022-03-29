require('./mongo')
const express = require('express')
const cors = require('cors') 
const { response } = require('express')
const app = express()
const Note = require('./module/notes.js')
const { findByIdAndDelete } = require('./module/notes.js')
const userRouter = require('./controller/users.js')
const noteRouter = require('./controller/notes.js')
const loginRouter = require('./controller/login.js')
const authRouter = require('./controller/auth.js')

app.use(express.json())
app.use(cors())
app.use(express.static('../app/build'))

app.use('/api/notes', noteRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/auth', authRouter)

app.use((error, req, res, next)=>{
  console.error(error)
  response.status(404).json(error)
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  })