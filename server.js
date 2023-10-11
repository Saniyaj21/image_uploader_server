import express from 'express';
import 'dotenv/config';
import { connectDB } from './database/connect.js';
import cors from 'cors'
import {v2 as cloudinary} from 'cloudinary';
import fileUpload from 'express-fileupload';

// routes import
import ImageRouter from './routes/imageRoute.js';

const server = express()

// database connection 
connectDB()

          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Using Middlewares
server.use(express.json());
server.use(fileUpload());
server.use(
    cors({
      origin:"http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    })
  );

// routes
server.use('/api/images', ImageRouter)


server.listen(process.env.PORT, ()=>{
console.log(`server is running at ${process.env.PORT}`)
})