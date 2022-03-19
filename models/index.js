// set up mongoose connection
const mongoose = require('mongoose')

// Mongo connection string
mongoose.connect('mongodb://localhost/springforwardpractice')

//shortcut to the DB
const db = mongoose.connection

//event listeners
db.once('open', ()=>{
    console.log(`connected to mongodb at ${db.host}:${db.port}`)
})

db.on('error', (err)=>{
    console.error(err)
})

module.exports.Bounty = require('./bounty')