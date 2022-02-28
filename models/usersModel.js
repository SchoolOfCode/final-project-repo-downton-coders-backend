import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail.js'

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    age: {
        type: Number,
        min: 18,
        max: 100,
        required: true,
    },
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
    },
    password:{
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'minimum password length is 6 characters'],
       
    },
    hobbies: [String],

    
    
}, {
    timestamps: true,
})


const user = mongoose.model("User", userSchema);

export default user;