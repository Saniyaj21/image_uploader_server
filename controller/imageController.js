// controllers here
import { Images } from '../models/imageModel.js';
import { v2 as cloudinary } from 'cloudinary';


// upload a image 
export const postImage = async (req, res) => {

    try {
        const myCloud = await cloudinary.uploader.upload(req.body.imageData, {
            folder: "sampleFolder",
            width: 150,
            crop: "scale",
        });
        // console.log(myCloud)

        const image = await Images.create({

            public_id: myCloud.public_id,
            url: myCloud.secure_url,

        });
        res.status(200).json({ success: true, image })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Can't post a image"
        })
    }
}

// get all images 
export const getAllImages = async (req, res) => {
    try {
        const allImages = await Images.find();
        res.status(200).json({ success: true, allImages })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Can't get images"
        })
    }
}