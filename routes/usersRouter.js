import express from "express";
import protect from "../middlewares/authmiddleware.js";
import {getAllUsers, registerUser, loginUser, getUser, updateUser, deleteUser, logoutUser} from '../controller/userController.js';

const router = express.Router()
router.get('/userProfile', protect, getUser)
router.get('/', getAllUsers)
router.get('/logout', logoutUser)
router.post('/', registerUser)
router.post('/login', loginUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)


// CREATE USER

// CREATE COMMENTS 

export default router;
