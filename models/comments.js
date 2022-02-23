import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    author_id: String,
    event_id: String,
    text: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    }
})

const comment = mongoose.model("Comment", commentSchema);

export default comment;