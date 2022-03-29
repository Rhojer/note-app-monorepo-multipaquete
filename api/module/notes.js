const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
})
noteSchema.set('toJSON',{
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id
        delete returnedObject.__v
        delete returnedObject._id
    }
})
const Note = mongoose.model('Note', noteSchema)

module.exports = Note