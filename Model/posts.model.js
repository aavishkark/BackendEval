const mongoose=require("mongoose")
const { Schema } = mongoose;
const postsSchema=new Schema({
title: String,
body: String,
device: String,
no_of_comments: Number
})
const postModel=mongoose.model('post',postsSchema)
module.exports={
    postModel
}