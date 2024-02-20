const userController = require("../controllers/users.controller")

const userRouter = require("express").Router()

userRouter.post("/register",userController.register)
userRouter.post("/login",userController.login)
userRouter.patch("/:id",userController.updateUser)
userRouter.delete("/:id",userController.deleteUser)


module.exports = userRouter