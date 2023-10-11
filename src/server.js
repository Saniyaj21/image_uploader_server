require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

const router = require('./router')

app.use(express.json())
app.use(cors)

const PORT = process.env.PORT || 8080;


app.get('/', (req, res)=>{
    res.send("Sani from backend")
})

app.listen(PORT, ()=>{
    console.log("Server is running ..")
})