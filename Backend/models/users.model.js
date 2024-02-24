const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
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
    },
    refreshToken:{
        type:String
    }
    
    
},{
    timestamps:true
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1d"
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "7d"
        }
    )
}


const UsersModel = mongoose.model("User",userSchema)


module.exports = {UsersModel} 