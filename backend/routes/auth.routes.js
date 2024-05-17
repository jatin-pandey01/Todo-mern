import express from 'express';
import {login,signUp,sendOtp,userAuth} from '../controllers/auth.controllers.js';
// const {login,signUp,sendOtp} = require('../controllers/auth.controllers.js');

const router = express.Router();

router.post('/login',login);
router.post('/send-otp',sendOtp);
router.post('/sign-up',signUp);
router.get('/user-auth',userAuth);

export default router;