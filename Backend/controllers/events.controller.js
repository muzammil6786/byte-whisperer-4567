const EventsModel = require("../models/events.model")
const { asyncHandler } = require("../utils/asyncHandler")
const {ApiResponse} = require("../utils/ApiResponse")
const {ApiError} = require("../utils/ApiError")

const createEvent = asyncHandler(async(req,res)=>{
    const {name,description,owner,category,date,time,location,seats,image} = req.body
    if(!name||!description||!owner||!category||!date||!time||!location||!seats){
        throw new ApiError(400,"All fields are required")
    }
        const newEvent = new EventsModel({
            name,
            description,
            category,
            date,
            time,
            location,
            seats,
            
            owner :req.user._id ,
            attendees:[]
        })
        await newEvent.save()
        return res.
        status(201).
        json(new ApiResponse(201,newEvent,"Event created successfully"))
    
})

const getAllEvents = asyncHandler(async(req,res)=>{
    const userID = req.user._id
    const events = await EventsModel.find({ $or: [{ owner: userID }, { attendees: userID }] })
    return res
    .status(200)
    .send(new ApiResponse(200,events,"Events retrieved successfully"))
    
})

const getEvent = asyncHandler(async(req,res)=>{
    const eventID = req.params.id
    const event = await EventsModel.findById(eventID)
    return res
    .status(200)
    .send(new ApiResponse(200,event,"Event retrieved successfully"))
})


const updateEvent = asyncHandler(async(req,res)=>{
    const userID = req.user._id
    const eventID = req.params.id
    if(userID !== event.owner){
        throw new ApiError(401,"Unauthorized")
    }
    const {name,description,category,date,time,location,seats,image} = req.body
    if(!name||!description||!category||!date||!time||!location||!seats){
        throw new ApiError(400,"All fields are required")
    }

    const updatedEvent = await EventsModel.findByIdAndUpdate(eventID,{name,description,category,date,time,location,seats,image})
    return res
    .status(200)
    .send(new ApiResponse(200,updatedEvent,"Event updated successfully"))
})

const deleteEvent = asyncHandler(async(req,res)=>{
    const userID = req.user._id
    const eventID = req.params.id
    if(userID !== event.owner){
        throw new ApiError(401,"Unauthorized")
    }
    const event = await EventsModel.findByIdAndDelete(eventID)
    if(!event){
        throw new ApiError(404,"Event not found")
    }
    return res
    .status(200)
    .send(new ApiResponse(200,{},"Event deleted successfully"))
})

module.exports = {
    createEvent,
    getAllEvents,
    getEvent,
    updateEvent,
    deleteEvent
}
