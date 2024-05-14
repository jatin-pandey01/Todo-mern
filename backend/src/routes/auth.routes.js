import express from 'express';
import {login,signUp,sendOtp} from '../controllers/auth.controllers.js';
// const {login,signUp,sendOtp} = require('../controllers/auth.controllers.js');

const router = express.Router();

router.post('/login',login);
router.post('/send-otp',sendOtp);
router.post('/sign-up',signUp);

export default router;