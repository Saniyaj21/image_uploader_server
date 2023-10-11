// image model here
import mongoose from "mongoose"


const imageSchema = new mongoose.Schema({
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
})

export const Images = mongoose.model("Images", imageSchema);