const express=require('express')
const { userModel } = require('../Model/users.model')
const userRoute=express()
const jwt=require("jsonwebtoken")
const bcrypt=require('bcrypt')
userRoute.post('/register',async(req,res)=>{
    let data=req.body
    try{
     let found= await userModel.findOne({"email":req.body.email})
     if(found==null){
        let doc=req.body
        let password=req.body.password
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(400).send({"msg":"Error while hashing"})  
            }
            else{
                doc.password=hash;
                const users=new userModel(doc)
                await users.save() 
                res.status(200).send({"msg":"new user registered"})
            }
        })
        
     }
      else{
        res.status(200).send({"msg":"User already exist, please login"})
     }
      
    }
    catch(err){
        console.log(err)
    }
    
})

userRoute.post('/login',async(req,res)=>{
    let {email,password}=req.body
    try{
        let found= await userModel.findOne({"email":email})
        if(found==null){
            res.status(400).send({"msg":"User Does not exist"})  
        }
        else{
            //console.log(found)
            bcrypt.compare(password,found.password,(err,result)=>{
                if(err){
                    res.status(400).send({"msg":"Password compare failed,Login Unsuccessfull"})  
                }
                else{
                    if(result){
                       const token=jwt.sign({ course: 'nem111' }, 'shhhhh');
                     //  localStorage.setItem('token',token)
                       res.status(200).send({"msg":"Login Successfull","token":token})
                    }
                }
            })
        }
       
    }
    catch(err){
       console.log(err)
    }
    

})
module.exports={
    userRoute
}