const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const {Signupmodel}=require("../model/usermodel")

const signRouter=express.Router();

signRouter.get("/",async(req,res)=>{
    try{
       const x=await Signupmodel.find();
       res.send(x);
    }
    catch(err){
       res.send(err)
       console.log(err);
    }
})

signRouter.post("/signup",async(req,res)=>{
    const {email,password}=req.body;
    const finduser=await Signupmodel.findOne({email})
    if(finduser?.email){
        res.send("user already present")
    }else{
        try{
            bcrypt.hash(password,8,async function(err,hash){
                const pers=new Signupmodel({email,password:hash})
                await pers.save();
                res.send({"msg":"user successfully registered"})
            })
         }
         catch(err){
            res.send({"msg":"user registration failed"})
            console.log(err);
         }
    }
    
})

signRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const finduser=await Signupmodel.find({email})
        if(finduser.length>0){
            const hashed=finduser[0].password
            bcrypt.compare(password,hashed,function(err,result){
                if(result){
                    const token=jwt.sign({"userID":finduser[0]._id},'code');
                    res.send({"msg":"login successfull","token":token})
                }else{
                    res.send({"msg":"login failed"})
                }
            })
        }else{
            res.send({"msg":"wrong credentials"})
        }
        }
        catch(err){
        console.log(err);
        }    
})

module.exports={signRouter}