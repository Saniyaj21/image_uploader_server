const mongoose = require('./database/mongoose')

const {Schema} = mongoose

const imageModel = new Schema({
    image:{
        type:'String',
        require:true
    },
    caption:{
        type:'String',
        require:true
    }
})


exports.imageCollection = mongoose.model('imageUpload',imageModel) 