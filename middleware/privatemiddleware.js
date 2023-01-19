const jwt=require("jsonwebtoken");

const privateMiddleware=(req,res,next)=>{
    const token=req.headers?.authorization?.split(" ")[1];
    if(token){
        const decrypts=jwt.verify(token,'code');
        if(decrypts){
            const userId=decrypts.userId
            req.body.userId=userId;
            next();
        }else{
            res.send({"msg":"please login"})
        }
    }else{
        res.send({"msg":"not authorized"})
    }
}
module.exports={privateMiddleware}