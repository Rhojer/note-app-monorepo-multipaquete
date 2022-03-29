const Note = require('./module/notes.js')
const mongoose = require('mongoose')
const { response } = require('express')

const connectionString = 'mongodb+srv://DEScontrol:añez22602675@descontrol.bcnrn.mongodb.net/rhojerdb?retryWrites=true&w=majority'

mongoose.connect(connectionString)
.then(()=>{
    console.log('database connected')
})
.catch(err =>{
    console.error(err)
    mongoose.connection.close();
})

// const note = new Note({
//     content: 'probando notas',
//     date: new Date
// })
// note.save()
// .then((result)=>{
// console.log(result)
// })
// .catch(err=>{
//     console.error(err)
// })