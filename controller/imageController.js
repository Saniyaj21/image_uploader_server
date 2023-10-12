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
      console.log(req.body.imageData , req.body.caption)

        const image = await Images.create({

            public_id: myCloud.public_id,
            url: myCloud.secure_url,
            caption:req.body.caption

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

//get unique Image using image Id
export const getImamgById = async (req,res)=>{
    const {id}= req.params
    console.log(id)
    try{
        const Image = await Images.findById({_id:id}).exec()
        res.status(200).json({
            success:true,
            Image
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:'Image not find',
        })
    }

}

//delete data 

export const deleteImage = async (req , res)=>{
    const {id } = req.params
    console.log("delete is",id)

    const {data} = await Images.findById({_id:id}).exec()

    cloudinary.uploader.destroy(data.public_id, (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Image deleted successfully');
        }
        
      });

   try{
         const data =await Images.findByIdAndDelete({_id:id}).exec()
         res.status(200).json({
            success:true,
            message:'data deleted succesfully'
         })
   }
   catch(err)
   {
    res.status(400).json({
        success:false,
        message:err
     })
   }

}