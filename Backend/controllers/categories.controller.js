const CategoriesModel = require("../models/categories.model")
const { asyncHandler } = require("../utils/asyncHandler")

const getAllCategories = asyncHandler(async(req,res)=>{
    const categories = await CategoriesModel.find()
    return res.
    status(200)
    .json(new ApiResponse(200,categories,"Categories retrieved successfully"))
})

const getCategory = async(req,res)=>{
    const categoryID = req.params.id
    const category = await CategoriesModel.findById(categoryID)
    return res
    .status(200)
    .json(new ApiResponse(200,category,"Category retrieved successfully"))
}

const deleteCategory = async(req,res)=>{

}


module.exports = {
    getAllCategories,
    getCategory,
    deleteCategory
}