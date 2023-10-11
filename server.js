import express from 'express';
import 'dotenv/config';
import { connectDB } from './database/connect.js';
import cors from 'cors'
// routes import
import ImageRouter from './routes/imageRoute.js';

const server = express()

// database connection 
connectDB()

// Using Middlewares
server.use(express.json());
server.use(
    cors({
      origin:process.env.FRONTEND_URL ,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    })
  );

// routes
server.use('/api/images', ImageRouter)


server.listen(process.env.PORT, ()=>{
console.log(`server is running at ${process.env.PORT}`)
})