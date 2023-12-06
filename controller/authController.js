import { User } from '../models/userModel.js'
import bcrypt from 'bcryptjs';
import { sendCookie } from '../utils/sendCookie.js'

export const newUser = async (req, res) => {

  try {

    let { name, email, password } = req.body;
    const user = await User.findOne({ email })

    if (user) return res.status(400).json({ success: false, message: 'user alrady exist...' });//if user exist , then return error

    //password encription 
    const encriptedPassword = await bcrypt.hash(password, 10)

    const data = await User.create({ name, email, password: encriptedPassword })
    //return token using JWT
    sendCookie(data, res, 200);
  }
  catch (err) {
    res.status(400).json({
      success: false,
      message: 'Can not Register !',
      err
    })
  }
}





///log in controller......

export const LoginUser = async (req, res) => {
  try {

    const { email, password } = req.body

    // checking if user has given password and email both


    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400)
        .json({
          success: false,
          message: "Invalid email or password"
        })
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(400)
        .json({
          success: false,
          message: "Invalid email or password"
        })
    }

    // successful login
    sendCookie(user, res, 200)
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}


/************** user data ****************** */

export const userInfo = async (req, res) => {

  try {
    console.log(req.user);

    const user = await User.findById(req.user._id)
    console.log(user);
    res.status(200).json({ success: false, user });
  } catch (error) {
    res.status(401).json({ success: false, message: 'User not available' });
  }
}


/****************** log out ******************* */

export const logOutUser = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expiresIn: new Date(
          Date.now()
        ),
        httpOnly: true,
        sameSite: "None",
        secure: true
      }).json({
        success: true,
        message: "user Logout successfully.."
      })

  } catch (error) {

    res.status(400).json({
      success: false,
      message: "logout faild...",
      error
    })

  }
}