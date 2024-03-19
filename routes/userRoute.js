import express  from "express";
import { LoginUser, forgotPassword, logOutUser, newUser, setNewPassword, userInfo, userProfileInfo, veryfyOTP } from "../controller/authController.js";
import { isAuthenticate } from "../middlewares/authenticate.js";


const router =express.Router();

router.post('/register', newUser)
router.post('/login', LoginUser)
router.get('/logout',isAuthenticate,logOutUser)
router.post('/password/forgot',forgotPassword)
router.post('/verify/otp',veryfyOTP)
router.post('/password/reset',setNewPassword)
router.get('/profile', isAuthenticate , userInfo)
router.get('/profile/:id', isAuthenticate , userProfileInfo)
export default router;