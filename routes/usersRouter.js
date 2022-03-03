import express from "express";
import protect from "../middlewares/authmiddleware.js";
import {registerUser, loginUser, updateUserProfile } from '../controller/userController.js';

const router = express.Router()
// router.get('/userProfile', protect, getUser)
// router.get('/', getAllUsers)
router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/profile', protect, updateUserProfile)

//router.post('/me', protect, updateUserPassword)
    

// CREATE USER

// CREATE COMMENTS 

export default router;
