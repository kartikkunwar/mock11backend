const express = require("express");
const cors=require("cors");
const { connection } = require("./config/db");
const {signRouter}=require("./routes/userRoute")
const app=express();

app.use(express.json());
app.use(cors({
    origin:"*"
}))

app.use("/user",signRouter)



app.listen(7600,async()=>{
    try{
        await connection;
        console.log("connected to db")
    }
    catch(err){
        console.log(err);
        console.log("error connecting")
    }
    console.log("listening to port")
})