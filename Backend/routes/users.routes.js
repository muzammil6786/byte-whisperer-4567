const userController = require("../controllers/users.controller")
const auth = require("../middlewares/auth.middleware")
const userRouter = require("express").Router()

userRouter.post("/register",userController.register)
userRouter.post("/login",userController.login)
userRouter.patch("/:id",auth,userController.updateUser)
userRouter.delete("/:id",auth,userController.deleteUser)
userRouter.post("/logout",auth,userController.logout)


module.exports = userRouter