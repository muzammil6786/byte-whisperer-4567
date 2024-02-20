const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:[true,"Category already exists"]
    }

})

module.exports = mongoose.model("Category",categorySchema)