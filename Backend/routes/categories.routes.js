const categoriesController = require("../controllers/categories.controller")
const auth = require("../middlewares/auth.middleware")
const access = require("../middlewares/access.middleware")

const categoryRouter = require("express").Router()

categoryRouter.get("/",auth,categoriesController.getAllCategories)
categoryRouter.get("/:id",auth,categoriesController.getCategory)
categoryRouter.delete("/:id",auth,categoriesController.deleteCategory)

module.exports = categoryRouter