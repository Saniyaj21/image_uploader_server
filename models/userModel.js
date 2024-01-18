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

    resetPasswordToken: String,
    resetPasswordExpaird: String

})

// Compare Password

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password); //entered password, hashed password
};

export const User = mongose.model("User", userSchema);


