const express=require('express')
const {postModel}=require("../Model/posts.model")
const postRoute=express()
const jwt=require("jsonwebtoken")
const { auth } = require('../MiddleWare/auth.middleware')


postRoute.get('/',auth,async(req,res)=>{
    try{
        const posts=await postModel.find()
        res.status(200).send({"posts":posts})
    }
    catch(err){
       res.status(400).send({"msg":"Server Error"})
    }
    
})

postRoute.post('/add',auth,async(req,res)=>{
    let data=req.body
    try{
        const posts=new postModel(data)
        await posts.save() 
        res.status(200).send({"msg":"new post added"})
    }
    catch(err){
        console.log(err)
    }
    
})

postRoute.get('/top',auth,async(req,res)=>{
    try{
        const posts=await postModel.find()
       // const posts1=JSON.parse(posts.posts);
        let max=-Infinity
        let details
        for(i=0;i<=posts.length-1;i++){
            if(posts[i].no_of_comments>max){
                max=posts[i].no_of_comments
                details=posts[i]
            }
        }
        res.status(200).send({"posts":details})
    }
    catch(err){
       res.status(400).send({"msg":"Server Error"})
    }
    
})

postRoute.patch('/update/:id',async(req,res)=>{
    let id=req.params.id
    console.log(req.params.id)
    const data=req.body
    try{
        let found= await postModel.findOne({"_id":id})
        if(found==null){
            res.status(200).send({"msg":"Post Does not exist"})  
        }
        else{
            let doc = await postModel.findOneAndUpdate({"_id":id},req.body);
            res.status(200).send({"msg":"post updated","data":req.body}) 
        }
       
    }
    catch(err){
        res.status(400).send({"msg":"Server Error"})  
    }
})


postRoute.delete('/delete/:id',async(req,res)=>{
    let id=req.params.id
    const data=req.body
    try{
        let found= await postModel.findOne({"_id":id})
        if(found==null){
            res.status(200).send({"msg":"Post Does not exist"})  
        }
        else{
            let doc = await postModel.findOneAndDelete({"_id":id});
            res.status(200).send({"msg":"post Deleted"}) 
        }
       
    }
    catch(err){
        res.status(400).send({"msg":"Server Error"})  
    }
    

})
module.exports={
    postRoute
}