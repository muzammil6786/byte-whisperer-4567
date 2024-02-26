const {UsersModel} = require("../models/users.model.js")
const BlacklistModel = require("../models/blacklist.model")
const GroupsModel = require("../models/groups.model")
const EventsModel = require("../models/events.model")
require("dotenv").config()
const {ApiError} = require("../utils/ApiError")
const {ApiResponse} = require("../utils/ApiResponse.js")
const {asyncHandler} =require("../utils/asyncHandler.js")
const {uploadOnCloudinary} = require("../utils/cloudinary.js")
const path = require("path")
const bcrypt = require("bcrypt")
const multer = require("multer")
const upload = multer({dest:"uploads/avatars/"})


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await UsersModel.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const register = asyncHandler(async(req,res)=>{

    // console.log(req.files.avatar);
        const {name,username,email,password,interests} = req.body
        if(!name||!username||!email||!password){
            throw new ApiError(400,"All fields are required")
        }
        // upload.single("file")(req,res,async(err)=>{
        //     if(err){
        //         return res.status(400).send("Error uploading file")
        //     }
        //const avatarLocalPath = req.files?.avatar[0]?.path;
        //const coverImageLocalPath = req.files?.coverImage[0]?.path;
   
    
        //const avatar = await uploadOnCloudinary(avatarLocalPath)    
        
       
console.log(req);
            const user = new UsersModel({
                name,
                username,
                email,
                password,
              //  avatar:avatar?.url||"",
                interests
            })
            //})
            await user.save()
            const newUser = await UsersModel.findById(user._id).select("-password -refreshToken")
            res.status(201).send(new ApiResponse(201, "User created successfully", newUser))
})
const login = asyncHandler(async(req,res)=>{
    const {email, username, password} = req.body
    console.log(email);

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }
    const user = await UsersModel.findOne({$or:[{username},{email}]})
    if (!user) {
        throw new ApiError(404, "User does not exist")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)
    const ownerGroups = await GroupsModel.find({  owner: user._id  })
    const memberGroups = await GroupsModel.find({  members: user._id  })
    const userEvents = await EventsModel.find({$or:[{owner:user._id},{attendees:user._id}]})
    const loggedInUser = await UsersModel.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser,ownerGroups,userEvents,memberGroups, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )


})

const updatePassword = asyncHandler(async(req,res)=>{
    
    const {oldPassword, newPassword} = req.body
    const userID = req.user.id
    const user = await UsersModel.findById(userID)
    if(!user){
        throw new ApiError(404,"User not found")
    }
    const isPasswordValid = await user.isPasswordCorrect(oldPassword)
    if(!isPasswordValid){
        throw new ApiError(401,"Invalid password")
    }
    const hashedPassword = await bcrypt.hash(newPassword,+process.env.SALT_ROUNDS)
    user.password = hashedPassword
    await user.save()
    return res
    .status(200)
    .json(new ApiResponse(200,{},"Password updated successfully"))
})

const updateUser = asyncHandler( async(req,res)=>{
    const userID = req.params.id
    if(userID !== req.user.id){
        throw new ApiError(401,"Unauthorized")
    }
    const {name,email,avatar,interests} = req.body
    if(!name||!email||!interests){
        throw new ApiError(400,"All fields are required")
    }
    const user = await UsersModel.findByIdAndUpdate(userID,{
        $set:
            { 
                name,
                email,
                interests
            }
    }).select("-password -refreshToken")
    if(!user){
        throw new ApiError(404,"User not found")
    }
        
    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
    
})

const deleteUser = asyncHandler(async(req,res)=>{

    const userID = req.params.id
    if(userID !== req.user.id){
        throw new ApiError(401,"Unauthorized")
    }
    const user = await UsersModel.findByIdAndDelete(userID)
    if(!user){
        throw new ApiError(404,"User not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "User deleted successfully"))
    
})

const logout = asyncHandler(async(req,res)=>{
    await UsersModel.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const token = req.header.autherization.split(" ")[1];
    const blacklist = new BlacklistModel({
        token
    })
    await blacklist.save()

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
    
})

module.exports = {
    register,
    login,
    updateUser,
    deleteUser,
    logout,
    updatePassword
}


