// image route here

import express from 'express';
import { getAllImages, postImage } from '../controller/imageController.js';


const router = express.Router();

router.post('/', postImage)
router.get('/', getAllImages)


export default router