const express = require('express')
var cors = require('cors')
const app = express()


app.use(cors())

app.use(express.json())

app.post('/api/endpoint',(req,res)=>{
    console.log("req.body",req.body)
    res.send(req.body);
})

app.listen(3500,()=>{
    console.log("started")
})