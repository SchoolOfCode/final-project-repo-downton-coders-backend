import express from "express";
import {
  getEvents,
  createEvent,
  deleteEventById,
} from "../controller/eventController.js";

const router = express.Router();
router.get("/", getEvents);
router.post("/", createEvent);
router.delete("/", deleteEventById);

// CREATE USER

// CREATE COMMENTS

export default router;
