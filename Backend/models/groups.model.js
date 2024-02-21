const mongoose = require("mongoose")

const groupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
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
    topics:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Category"
    }

})

const GroupModel = mongoose.model("Group",groupSchema)

module.exports = GroupModel