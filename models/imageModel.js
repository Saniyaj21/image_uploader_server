// image model here
import mongoose from "mongoose"


const imageSchema = new mongoose.Schema({

    public_id: {
        type: String,
    },
    url: {
        type: String,
    },
    caption: {
        type: String,
        max: 1000

    },
    isPublic:{
        type:Boolean,
        default: false
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },


})

export const Images = mongoose.model("Images", imageSchema);