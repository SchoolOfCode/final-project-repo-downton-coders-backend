import express from "express";
import protect from "../middlewares/authmiddleware.js";
import {getAllUsers, registerUser, loginUser, getUser} from '../controller/userController.js';

const router = express.Router()
router.get('/userProfile', protect, getUser)
router.get('/', getAllUsers)
router.post('/', registerUser)
router.post('/login', loginUser)


// CREATE USER

// CREATE COMMENTS 

export default router;
