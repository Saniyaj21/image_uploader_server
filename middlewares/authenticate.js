import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js';
import 'dotenv'
export const isAuthenticate = async(req, res , next)=>{
     
    const  token = req.cookies.token
    console.log("token=>",token);
    if(!token){
        return res.status(400).json({success:false , message:"not login" })
    }
    const decode = jwt.verify(token , process.env.JWT_KEY)

    req.user = await User.findById({_id : decode._id });
    next();
}