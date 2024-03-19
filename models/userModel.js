import mongose from 'mongoose'
import validator from 'validator';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';


const userSchema = new mongose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator: [validator.isEmail, 'Email is not valid ,please enter valid email']
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'minimum 8 charecter required.']
    },
    token: {
        type: String,
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },


    resetPasswordOTP: String,
    resetPasswordOTPExpire: Date,

})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});


// Compare Password

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password); //entered password, hashed password
};




userSchema.methods.getResetPasswordOTP = function () {
    // Generating OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set OTP and its expiration time
    this.resetPasswordOTP = otp;
    this.resetPasswordOTPExpire = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    return otp;
};


userSchema.methods.verifyResetPasswordOTP = function (otp) {
    // Check if the OTP is valid and has not expired
    return (
        this.resetPasswordOTP === otp &&
        this.resetPasswordOTPExpire &&
        this.resetPasswordOTPExpire > Date.now()
    );
};


export const User = mongose.model("User", userSchema);


