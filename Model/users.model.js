const mongoose=require("mongoose")
const { Schema } = mongoose;
const userSchema=new Schema({
name: String,
email: String,
gender: String,
password: String,
age: Number,
city: String,
is_married: Boolean
})
const userModel=mongoose.model('user',userSchema)
module.exports={
    userModel
}