const groupRouter = require("express").Router()
const auth = require("../middlewares/auth.middleware")

const groupController = require("../controllers/groups.controller")

groupRouter.post("/",auth,groupController.createGroup)
groupRouter.get("/",auth,groupController.getAllGroups)
groupRouter.get("/:id",auth,groupController.getGroup)
groupRouter.patch("/:id",auth,groupController.updateGroup)
groupRouter.delete("/:id",auth,groupController.deleteGroup)

module.exports = groupRouter
