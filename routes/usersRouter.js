import express from "express";
import {getAllUsers, registerUser, loginUser, getUser} from '../controller/userController.js';

const router = express.Router()
router.get('/userProfile', getUser)
router.get('/', getAllUsers)
router.post('/', registerUser)
router.post('/login', loginUser)


// CREATE USER

// CREATE COMMENTS 

export default router;
