const categoriesController = require("../controllers/categories.controller")

const categoryRouter = require("express").Router()

categoryRouter.get("/",categoriesController.getAllCategories)
categoryRouter.get("/:id",categoriesController.getCategory)
categoryRouter.delete("/:id",categoriesController.deleteCategory)

module.exports = categoryRouter