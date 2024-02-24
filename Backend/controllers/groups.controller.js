const GroupModel = require("../models/groups.model")
const {ApiResponse} = require("../utils/ApiResponse")
const {ApiError} = require("../utils/ApiError")
const { asyncHandler } = require("../utils/asyncHandler")

const createGroup = asyncHandler(async(req,res)=>{
    const {name,description,owner,members,interests} = req.body
    if(!name||!description||!owner||!interests ){
        throw new ApiError(400,"All fields are required")
    }
        const newGroup = new GroupModel({
            name,
            description,
            owner,
            members:members?members:[owner],
            events:[],
            interests
        })
        await newGroup.save()
        return res.
        status(201).
        json(new ApiResponse(201,newGroup,"Group created successfully"))
})


const getAllGroups = asyncHandler(async(req,res)=>{
    const userID = req.user._id
        const OwnerGroups = await GroupModel.find({  owner: userID  })
        const memberGroups = await GroupModel.find({  members: userID  })
        return res.
        status(200)
        .json(new ApiResponse(200,{OwnerGroups,memberGroups},"Groups retrieved successfully"))
})

const getGroup = asyncHandler(async(req,res)=>{
    
    const groupID = req.params.id
        const group = await GroupModel.findById(groupID)
        if(!group){
            throw new ApiError(404,"Group not found")
        }
        if(group.members.indexOf(req.user._id) === -1){
            throw new ApiError(401,"Unauthorized")
        }
        return res.
        status(200).json(new ApiResponse(200,group,"Group retrieved successfully"))
    
})
const updateGroup = asyncHandler(async(req,res)=>{
    const groupID = req.params.id
    const {name,description,owner,members,interests,events} = req.body  
    if(!name||!description||!owner||!members||!interests||!events){
        throw new ApiError(400,"All fields are required")
    }
    
        const group = await GroupModel.findById(groupID)
        if(!group){
            throw new ApiError(404,"Group not found")
        }
        if(req.user._id !== group.owner){
            throw new ApiError(401,"Unauthorized")
        }
        const updatedGroup = await GroupModel.findByIdAndUpdate(groupID,{name,description,owner,members,interests,events})
        return res.
        status(200).json(new ApiResponse(200,updatedGroup,"Group updated successfully"))
})

const deleteGroup = asyncHandler(async(req,res)=>{
    const groupID = req.params.id
    
    const group = await GroupModel.findById(groupID)
    if(!group){
        throw new ApiError(404,"Group not found")
    }
    if(req.user._id !== group.owner){
        throw new ApiError(401,"Unauthorized")
    }
    await GroupModel.findByIdAndDelete(groupID)
    return res.
    status(200).json(new ApiResponse(200,{},"Group deleted successfully"))
})

module.exports = {
    createGroup,
    getAllGroups,
    getGroup,
    updateGroup,
    deleteGroup
}