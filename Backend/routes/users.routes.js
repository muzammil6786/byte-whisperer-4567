const {login,register,updateUser,deleteUser,logout, updatePassword } = require("../controllers/users.controller")
const auth = require("../middlewares/auth.middleware")
const userRouter = require("express").Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.patch("/update/:id",auth,updateUser)
userRouter.post("/password",auth,updatePassword)
userRouter.delete("/:id",auth,deleteUser)
userRouter.post("/logout",auth,logout)


module.exports = userRouter