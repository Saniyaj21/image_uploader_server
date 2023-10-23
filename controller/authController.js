import { User } from '../models/userModel.js'
import  bcrypt from 'bcryptjs';
import { sendCookie  }from '../utils/sendCookie.js'

export const  newUser = async (req,res)=>{
  
    try{
    
    let {name , email , password }= req.body;
    const user =await User.findOne({email})

    if(user) return  res.status(400).json({success:false ,message:'user alrady exist...'});//if user exist , then return error
    
        //password encription 
        const encriptedPassword = await bcrypt.hash(password ,10)

        const data =await User.create({name , email , password:encriptedPassword })
        //return token using JWT
        sendCookie(data , res , 'registration completed....' , 200 );
    }
    catch(err){
              // console.log("err   :",err)
                res.status(400).json({
                    success:false,
                    message:'can not registration ...',
                    err
                })
        }
}
        
        
        


///log in controller......

export const LoginUser = async (req, res) => {
  try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) return res.status(400).json({ success: false, message:'Incorrect user or password'  });
      // match encripted password with enter password..
      const isAuthenticate = await bcrypt.compare(password , user.password)
      if (!isAuthenticate) 
      return res.status(401).json({ success: false, message: 'Incorrect user or password' });
    
   
      // return token using JWT
      sendCookie(user , res , 'Login Successfully....' , 200 );

    } catch (error) {
      //console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }


  /************** user data ****************** */

  export const userInfo = async (req , res)=>{
      
     const data = req.user;
     res.json({
     data
     })
  }
  

  /****************** log out ******************* */

  export const logOutUser= async (req,res)=>{
    try {
      res
      .status(200)
      .cookie("token",null , {
        expiresIn: new Date(
          Date.now() 
        ),
        httpOnly: true,
        sameSite: "None",
        secure: true
      }).json({
        success:true,
        message:"user Logout successfully.."
      })
      
    } catch (error) {
      
       res.status(400).json({
        success:false ,
        message:"logout faild...",
        error
       })

    }
  }