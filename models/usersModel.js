import mongoose from "mongoose";

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
    email: String,
    password:{
        type: String,
        required: true,
    },
    hobbies: [String],

    
    
}, {
    timestamps: true,
})


const user = mongoose.model("User", userSchema);

export default user;