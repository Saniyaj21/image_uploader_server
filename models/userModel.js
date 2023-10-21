import mongose from 'mongoose'
import validator from 'validator';


const userSchema = new mongose.Schema({
    name:{
        type:String,
        required:true ,
    },
    email:{
        type:String,
        required:true ,
        unique:true,
        validator:[validator.isEmail , 'Email is not valid ,please enter valid email']
    },
    password:{
        type:String,
        required:true,
        minLength:[8,'minimum 8 charecter required.']
    },
   
    resetPasswordToken:String,
    resetPasswordExpaird:String
    
})

export const User = mongose.model("Users", userSchema);


