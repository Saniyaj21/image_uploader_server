import express from 'express';
import 'dotenv/config';
import { connectDB } from './database/connect.js';
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import tinify from "tinify";

// Set your API key
tinify.key = process.env.TINIFY_KEY;
tinify.proxy = "http://localhost:8080";



// routes import
import imageRouter from './routes/imageRoute.js';
import userRouter from './routes/userRoute.js'
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
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

server.use(bodyParser.json({ limit: '50mb' }));

// Increase the request size limit for URL-encoded data
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//use cookies parser ...
server.use(cookieParser());

// routes
server.use('/api/user', userRouter)
server.use('/api/images', imageRouter)

server.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}`)
})