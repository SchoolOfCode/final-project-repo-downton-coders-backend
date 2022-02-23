import express from "express";
import {getUsers, registerUser, loginUser} from '../controller/userController.js';

const router = express.Router()
router.get('/', getUsers)
router.post('/', registerUser)
router.post('/login', loginUser)


// CREATE USER

// CREATE COMMENTS 

export default router;
