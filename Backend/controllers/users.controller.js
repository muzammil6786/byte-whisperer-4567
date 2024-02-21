const UsersModel = require("../models/users.model")
const BlacklistModel = require("../models/blacklist.model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const path = require("path")
const bcrypt = require("bcrypt")
const multer = require("multer")
const upload = multer({dest:"uploads/avatars/"})


const register = async(req,res)=>{

    try{
        const {username,email,password,avatar,interests} = req.body
        if(!username||!email||!password){
            res.status(400).send("All fields are required")
        }
        // upload.single("file")(req,res,async(err)=>{
        //     if(err){
        //         return res.status(400).send("Error uploading file")
        //     }
            const hashedPassword = await bcrypt.hash(password,+process.env.SALT_ROUNDS)
            const newUser = new UsersModel({
                username,
                email,
                password:hashedPassword,
                //avatar:req.file.path,
                interests
            })
            //})
            await newUser.save()
            res.send("User created successfully")
        }catch(err){
        res.status(500).send({error:err.message})
    }
}

const login = async(req,res)=>{
  try { 
    const {username,email,password} = req.body
    if((!username&&!email)||!password){
        res.status(400).send("All fields are required")
    }

    const user = await UsersModel.findOne({$or:[{username},{email}]})
    if(!user){
        res.status(404).send("User not found")
    }
    bcrypt.compare(password,user.password ).then(match=>{
        if(!match){
            res.status(400).send("Invalid credentials")
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)
        res.status(200).send({message:"Login successful",token})
    })
}catch(err){
    res.status(500).send({error:err.message})
}

}

const updateUser = async(req,res)=>{
    const userID = req.params.id
    if(userID !== req.user.id){
        res.status(401).send("Unauthorized")
    }
    const {name,email,password,avatar,interests} = req.body
    if(!name||!email||!password){
        res.status(400).send("All fields are required")
    }

    const hashedPassword = await bcrypt.hash(password,+process.env.SALT_ROUNDS)
    upload.single("file")(req,res,async(err)=>{
        if(err){
            return res.status(400).send("Error uploading file")
        }

    const user = await UsersModel.findByIdAndUpdate(userID,{name,email,password:hashedPassword,avatar,interests})
        if(!user){
            res.status(404).send("User not found")
        }
        res.status(200).send("User updated successfully")
    })
    
}

const deleteUser = async(req,res)=>{

    const userID = req.params.id
    if(userID !== req.user.id){
        res.status(401).send("Unauthorized")
    }
    const user = await UsersModel.findByIdAndDelete(userID)
    if(!user){
        res.status(404).send("User not found")
    }
    res.status(200).send("User deleted successfully")
    
}

const logout = async(req,res)=>{
    const token = req.header.autherization.split(" ")[1];
    const blacklist = new BlacklistModel({
        token
    })
    await blacklist.save()
    res.status(200).send("Logout successful")
}

module.exports = {
    register,
    login,
    updateUser,
    deleteUser,
    logout
}


