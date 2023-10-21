import jwt from 'jsonwebtoken'
import 'dotenv'

export const sendCookie = (user , res , message , statusCode = 200)=>{

    const token = jwt.sign({_id:user._id},process.env.JWT_KEY,);
    const option = {
        expiresIn:new Date(
            Date.now()+ process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000
        ),
       // httpOnly:true
    }

    res
    .status(statusCode)
    .cookie("token",token,option)
    .json({
        success:true,
        message,
        user,
        token
    })

}

