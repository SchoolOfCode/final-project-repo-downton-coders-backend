import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  author_name: String,
  author_id: String,
  title: String,
  location: String,
  star_rating: Number,
  date: String,
  description: String,
  image: String,
  categories: [String],
  price: Number,
  external_event: String,
});

const event = mongoose.model("Event", eventSchema);

export default event;
