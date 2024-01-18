import express  from "express";
import { LoginUser, logOutUser, newUser, userInfo, userProfileInfo } from "../controller/authController.js";
import { isAuthenticate } from "../middlewares/authenticate.js";


const router =express.Router();

router.post('/register', newUser)
router.post('/login', LoginUser)
router.get('/logout',logOutUser)
router.get('/profile', isAuthenticate , userInfo)
router.get('/profile/:id', isAuthenticate , userProfileInfo)
export default router;