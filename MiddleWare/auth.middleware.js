const jwt=require('jsonwebtoken')
const auth=(req,res,next)=>{
    let token=req.headers.token.split(" ")[1]
    jwt.verify(token,"shhhhh",(err,decoded)=>{
        if(err){
            console.log(err)
            res.status(200).send({"msg":"Please Login again"})
           
        }
        else{
            console.log(decoded)
            next()
        }
    })
}
module.exports={auth}