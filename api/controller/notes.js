const { response } = require('express')
const Note = require('../module/notes.js')
const User = require('../module/user.js')
const noteRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const tokenExtractor = require('../middleware/tokenExtractor')


noteRouter.get('/', (req, res, next) => {
    Note.find({}).populate('user', {
        username: 1
    })
    .then(note=>{
      res.json(note)
    })
    .catch(err=>
      next(err))
  })
  
  noteRouter.get('/:id', (req,res) =>{
    const {id} = req.params
    Note.findById(id)
    .then(result =>{
      res.json(result)
    })
  })
  
  noteRouter.post('/',tokenExtractor, async (req, res) =>{
      const note = req.body
     
      const user = await User.findById(note.userId)
      const newNote = new Note({
        content: note.content,
        date: new Date(),
        user: user._id
      })
      
    const saveNewNote = await newNote.save()
    user.notes = user.notes.concat(saveNewNote._id)
    const saveUser = await user.save()
    res.json(saveNewNote)
       
  })
  
  noteRouter.delete('/:id', (req,res)=>{
  const {id} = req.params
  Note.findByIdAndDelete(id, (err,doc)=>{
    if (err){
      console.log(err)
  }
  else{
      reload = true
      console.log("Deleted : ", doc);
  }
  })
  })

  module.exports = noteRouter