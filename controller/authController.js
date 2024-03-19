import { User } from '../models/userModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary';
import { folderName } from '../utils/constants.js';
import { sendEmail } from '../utils/sendEmail.js';

export const newUser = async (req, res) => {

  try {

    let { name, email, password } = req.body;


    const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
      folder: folderName,
      width: 250,
      crop: "scale",
    });

    const user2 = await User.findOne({ email })

    if (user2) return res.status(400).json({ success: false, message: 'user alrady exist...' });//if user exist , then return error



    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      }
    })

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,);

    user.token = token;
    user.save();



    res.status(200).json({
      success: true,
      token,
      user,
    });

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

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,);

    user.token = token;
    user.save();

    res.status(200).json({
      success: true,
      token,
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}


/************** user data ****************** */

export const userInfo = async (req, res) => {

  try {

    const user = await User.findById(req.user._id)
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(401).json({ success: false, message: 'User not available' });
  }
}

/************** user data ****************** */

export const userProfileInfo = async (req, res) => {

  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ success: false, user });
  } catch (error) {
    res.status(401).json({ success: false, message: 'User not available' });
  }
}


/****************** log out ******************* */

export const logOutUser = async (req, res) => {
  try {
    const id = req.user._id
    const user = await User.findById(id).select('+token');

    user.token = undefined
    user.save();
    res.status(200).json({
      success: true,
      logOut: true,
      token: null
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: "logout faild...",
      error
    })

  }
}


// forgot password recive email from frontenda and send the otp
export const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // otp method
    const resetOTP = user.getResetPasswordOTP();

    await user.save({ validateBeforeSave: false });

    const message = `Your password reset OTP is :- \n\n ${resetOTP} \n\nIf you have not requested this email then, please ignore it.`;

    try {
      await sendEmail({
        email: user.email,
        subject: `CloudGallery: forgot password OTP : ${resetOTP}`,
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordOTP = undefined;
      user.resetPasswordOTPExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get and verify the otp from frontend

export const veryfyOTP = async (req, res) => {

  try {
    const { resetPasswordOTP } = req.body;

    const user = await User.findOne({
      resetPasswordOTP,
    });
    // console.log(user);
    // console.log(user.verifyResetPasswordOTP(resetPasswordOTP));

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset Password OTP is invalid or has been expired",
      });
    }
    // console.log(user);
    if (user.verifyResetPasswordOTP(resetPasswordOTP)) {
      res.status(200).json({
        success: true

      });
    }
    else {
      res.status(400).json({
        success: false,
        message: error.message,
      })
    }

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}


// reset password

export const setNewPassword = async (req, res) => {

  try {

    const { resetPasswordOTP, password } = req.body;
    // console.log(resetPasswordOTP);

    const user = await User.findOne({
      resetPasswordOTP,

    });

    // console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset Password OTP is invalid or has been expired",
      });
    }


    // console.log(900, user);

    if (user.verifyResetPasswordOTP(resetPasswordOTP)) {
      user.password = password;

      // Clear the OTP and its expiration time
      user.resetPasswordOTP = undefined;
      user.resetPasswordOTPExpire = undefined;



      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,);

      user.token = token;
      user.save();
      res.status(200).json({
        success: true,
        token,
        user
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Cant't verify your otp",
      });
    }

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Cant't verify your otp",
    });
  }

}

