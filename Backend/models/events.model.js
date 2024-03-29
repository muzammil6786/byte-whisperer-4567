const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    attendees:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User",
    },
    seats:{
        type:Number,
        required:true
    }   
})

const EventsModel = mongoose.model("Event",eventSchema)
module.exports = EventsModel