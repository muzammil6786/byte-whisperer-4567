const express =require("express")
const cors = require("cors")
require("dotenv").config()

const userRouter = require("./routes/users.routes")
const eventRouter = require("./routes/events.routes")
const categoryRouter = require("./routes/categories.routes")
const connectDB = require("./config/dbconnection")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/users",userRouter)
app.use("/events",eventRouter)


app.listen(process.env.PORT,async()=>{
    await connectDB
    console.log(`Server started on port http://localhost:${process.env.PORT}`)
})