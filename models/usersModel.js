import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
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

    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      }

    
    
}, {
    timestamps: true,
})
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
// userSchema.methods.createJWT = function() {
//     return jwt.sign({UserId:this._id, username: this.username}, process.env.JWT_SECRET_TOKEN, {expiresIn: process.env.JWT_LIFETIME})

// }
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch

}

const user = mongoose.model("User", userSchema);

export default user;