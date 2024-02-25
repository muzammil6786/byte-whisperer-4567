const express =require("express")
const cors = require("cors")
require("dotenv").config()

const userRouter = require("./routes/users.routes")
const eventRouter = require("./routes/events.routes")   
const categoryRouter = require("./routes/categories.routes")
const connectDB = require("./config/dbconnection")
const groupRouter = require("./routes/groups.routes")
const app = express()
const server =require("http").createServer(app)
const {Server} = require("socket.io")
const io = new Server(server,{
    cors:{
        origin:"*"
    }
})



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/users",userRouter)
app.use("/events",eventRouter)
app.use("/categories",categoryRouter)
app.use("/groups",groupRouter)

io.on("connection",(socket)=>{
    console.log("Client connected",socket.id)
    socket.on("user",(data)=>{
        console.log(data);
    })
    socket.on("disconnect",()=>{
        console.log("Client disconnected",socket.id)
    })
})

server.listen(process.env.PORT,async()=>{
    await connectDB
    console.log(`Server started on port http://localhost:${process.env.PORT}`)
})