const mongoose = require("mongoose")

const groupSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"Group already exists"],
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    events:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Event"
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    members:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User"
    },
    interests:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Category"
    },
    image:{
        type:String
    }

},{
    timestamps:true,
    versionKey:false,
    validateBeforeSave:true
})

const GroupModel = mongoose.model("Group",groupSchema)

module.exports = GroupModel