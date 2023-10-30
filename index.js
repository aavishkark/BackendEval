const express=require('express')
const { connection } = require('./db')
const { userRoute } = require('./Routes/user.routes')
const {postRoute}=require('./Routes/posts.routes')
const app=express()
app.use(express.json())
app.use('/users',userRoute)
app.use('/posts',postRoute)
app.listen(4500,async()=>{
    try{
        await connection
    console.log("connected")
    }
    catch(err){
        console.log(err)
    }
    
})