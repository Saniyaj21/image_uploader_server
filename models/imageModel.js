// image model here
const express = require('express')
 const mongoose = require('mongoose')

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