const groupRouter = require("express").Router()

const groupController = require("../controllers/groups.controller")

groupRouter.post("/",groupController.createGroup)
groupRouter.get("/",groupController.getAllGroups)
groupRouter.get("/:id",groupController.getGroup)
groupRouter.patch("/:id",groupController.updateGroup)
groupRouter.delete("/:id",groupController.deleteGroup)

module.exports = groupRouter
