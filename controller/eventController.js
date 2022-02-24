import event from "../models/events.js";

export const getEvents = async (req, res) => {
  const Event = await event.find();
  res.status(200).json(Event);
};

export const createEvent = async (req, res) => {
  const author_name = await req.body.author_name;
  const author_id = await req.body.author_id;
  const title = await req.body.title;
  const location = await req.body.location;
  const star_rating = await req.body.star_rating;
  const date = await req.body.date;
  const description = await req.body.description;
  const image = await req.body.image;
  const categories = await req.body.categories;
  const price = await req.body.price;
  const external_event = await req.body.external_event;
  const newEvent = await event.create({
    author_name: author_name,
    author_id: author_id,
    title: title,
    location: location,
    star_rating: star_rating,
    date: date,
    description: description,
    image: image,
    categories: categories,
    price: price,
    external_event: external_event,
  });
  return res.status(200).send({ newEvent: newEvent });
  // res.send({ newEvent: newEvent });
  // res.status(201).json({ message: "create event" });
};

export const deleteEventById = async (req, res) => {
  const id = await req.body.id;

  const deleteEvent = await event.deleteOne({ _id: id });
  return res.status(200).send({ deleteEvent: deleteEvent });
};
