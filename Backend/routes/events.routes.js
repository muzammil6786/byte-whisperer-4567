const eventController = require("../controllers/events.controller")

const eventRouter = require("express").Router()
eventRouter.post("/",eventController.createEvent)
eventRouter.get("/",eventController.getAllEvents)
eventRouter.get("/:id",eventController.getEvent)
eventRouter.patch("/:id",eventController.updateEvent)
eventRouter.delete("/:id",eventController.deleteEvent)



module.exports = eventRouter