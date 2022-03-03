import express from "express";
import protect from "../middlewares/authmiddleware.js";
import {
  getEvents,
  createEvent,
  getEventsBySearchLocation,
  getEventsBySearchCategory,
  deleteEventById,
  getEventById,
  updateEventById,
  joinEventById,
  quitEventById,
  getHostEvent,
  getJoinedEvent,
} from "../controller/eventController.js";

const router = express.Router();
router.get("/", getEvents);
router.post("/", protect, createEvent);
router.get("/searchlocation", getEventsBySearchLocation);
router.get("/searchcategory", getEventsBySearchCategory);
//Example: http://localhost:3000/events/621652d4fdeecf65b33a5338
router.delete("/:event_id", deleteEventById);
router.get("/:event_id", getEventById);
router.patch("/:event_id", updateEventById);
//Example: http://localhost:3000/events/join/621652d4fdeecf65b33a5338
router.patch("/join/:event_id", joinEventById);
router.patch("/quit/:event_id", quitEventById);
router.get("/user/host/:user_id", getHostEvent);
router.get("/user/joined/:user_id", getJoinedEvent);

// CREATE USER

// CREATE COMMENTS

export default router;
