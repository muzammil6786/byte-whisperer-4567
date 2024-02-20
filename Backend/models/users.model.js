const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,"Username already exists"]
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email already exists"]
        
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    interests:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Category"
    }
    
    
})