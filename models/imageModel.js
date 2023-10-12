// image model here
import mongoose from "mongoose"


const imageSchema = new mongoose.Schema({

    public_id: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    caption:{
        type:String,
        required:false,
        max:500

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },


})

export const Images = mongoose.model("Images", imageSchema);