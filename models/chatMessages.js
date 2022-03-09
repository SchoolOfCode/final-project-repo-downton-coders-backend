import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
    author_id: String,
    text: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    }
})

const chatMessage = mongoose.model("ChatMessages", chatMessageSchema);

export default chatMessage;