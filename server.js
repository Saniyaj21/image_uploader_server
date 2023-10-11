import express from 'express';

const server = express()

server.get('/', (req, res)=>{
res.send("Sani from backend")
})

server.listen(8080, ()=>{
console.log("Server is running ..")
})