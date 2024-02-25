const eventController = require("../controllers/events.controller")
const auth = require("../middlewares/auth.middleware")

const eventRouter = require("express").Router()

eventRouter.post("/",auth,eventController.createEvent)
eventRouter.get("/",auth,eventController.getAllEvents)
eventRouter.get("/:id",auth,eventController.getEvent)
eventRouter.patch("/:id",auth,eventController.updateEvent)
eventRouter.delete("/:id",auth,eventController.deleteEvent)



module.exports = eventRouter