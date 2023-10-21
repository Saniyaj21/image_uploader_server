import express  from "express";
import { LoginUser, newUser } from "../controller/authController.js";


const router =express.Router();

router.post('/register', newUser)
router.post('/login', LoginUser)
export default router;