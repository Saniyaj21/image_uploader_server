// image route here

import express from 'express';
import { getAllImages, postImage , getImamgById, deleteImage, getAllPublicImages, likeImage, unlikeImage } from '../controller/imageController.js';
import { isAuthenticate } from '../middlewares/authenticate.js';


const router = express.Router();

router.post('/',isAuthenticate, postImage)
router.get('/',isAuthenticate, getAllImages)
router.get('/public',isAuthenticate, getAllPublicImages)
router.get('/:id',isAuthenticate, getImamgById)
router.delete('/:id',isAuthenticate, deleteImage)
router.post('/likes/:id',isAuthenticate, likeImage)
router.post('/unlikes/:id',isAuthenticate, unlikeImage)

export default router