import express from 'express';
import 'dotenv/config';
import { connectDB } from './database/connect.js';
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';


// routes import
import ImageRouter from './routes/imageRoute.js';
import Auth from './routes/auth.js'
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
    origin: 'http://localhost:5173' || 'http://localhost:5174',
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
server.use('/auth', Auth)
server.use('/api/images', ImageRouter)

server.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}`)
})