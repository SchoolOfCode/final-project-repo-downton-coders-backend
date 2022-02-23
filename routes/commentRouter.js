import express from "express";
import {getComments, getCommentsByUserId, createComment} from "../controller/commentsController.js";


const router = express.Router()

router.get('/', getComments);
router.get("/:id", getCommentsByUserId);
router.post('/', createComment);


export default router;
  

  