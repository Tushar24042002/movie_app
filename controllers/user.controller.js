import express from 'express';
import { createUser, getAllUsers } from '../services/user.service.js';

const router = express.Router();

// Route to create a new user
router.post('/create', createUser);

// Route to get all users
router.get('/', getAllUsers);

export default router;
