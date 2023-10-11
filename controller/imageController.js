// controllers here
import { Images } from '../models/imageModel.js'

// upload a image 
export const postImage = async (req, res) => {

    try {

        const image = await Images.create({
            images: {
                public_id: "profile pic",
                url: "https://i.dummyjson.com/data/products/1/1.jpg"
            }
        });
        res.status(200).json({ success: true, image })
    } catch (error) {
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
        res.status(200).json({success:true,  allImages })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Can't get images"
        })
    }
}