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
    createdAt: {
        type: Date,
        default: Date.now,
    },


})

export const Images = mongoose.model("Images", imageSchema);