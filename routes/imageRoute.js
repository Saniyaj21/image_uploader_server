// image route here

import express from 'express';
import { getAllImages, postImage , getImamgById, deleteImage } from '../controller/imageController.js';
import { isImageAuth } from '../middlewares/imageAuth.js';


const router = express.Router();

router.post('/',isImageAuth, postImage)
router.get('/',isImageAuth, getAllImages)
router.get('/:id',isImageAuth, getImamgById)
router.delete('/:id',isImageAuth, deleteImage)

export default router