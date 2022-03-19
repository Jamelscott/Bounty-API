const express = require('express')
const app = express()
const cors = require('cors')

//middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('/bounties', require('./controllers/bounty'))

app.listen(8000, ()=>{
    console.log("Port 8000")
})