import mongoose from "mongoose";

const dbConnect=()=>{
    mongoose.connect("mongodb://localhost:27017/LETS_CHAT").then(()=>{
        console.log("db Connected");
        
    }).catch(err=>{
        console.log("db connection failed\n",err);
        
    })
}

export default dbConnect