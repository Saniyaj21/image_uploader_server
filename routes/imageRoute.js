// image route here

import express from 'express';
import { getAllImages, postImage , getImamgById, deleteImage } from '../controller/imageController.js';


const router = express.Router();

router.post('/', postImage)
router.get('/', getAllImages)
router.get('/:id', getImamgById)
router.delete('/:id', deleteImage)

export default router