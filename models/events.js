import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

  title: String,
  location: String,
  star_rating: Number,
  date: String,
  start_time: String,
  end_time: String,
  description: String,
  image: String,
  categories: [String],
  price: Number,

  external_event: String,
  attendance_id: [String],
  
 User: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },

});

const event = mongoose.model("Event", eventSchema);

export default event;
