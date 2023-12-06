import express  from "express";
import { LoginUser, logOutUser, newUser, userInfo } from "../controller/authController.js";
import { isAuthenticate } from "../middlewares/authenticate.js";


const router =express.Router();

router.post('/register', newUser)
router.post('/login', LoginUser)
router.get('/logout',logOutUser)
router.get('/profile', isAuthenticate , userInfo)
export default router;