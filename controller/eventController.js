import event from "../models/events.js";

//GET All Events

export const getEvents = async (req, res) => {
  const Event = await event.find({User: req.user._id});
  res.status(200).json(Event);
};

//POST a New Event

export const createEvent = async (req, res) => {
  const author_name = await req.body.author_name;
  const author_id = await req.body.author_id;
  const title = await req.body.title;
  const location = await req.body.location;
  const star_rating = await req.body.star_rating;
  const date = await req.body.date;
  const start_time = await req.body.start_time;
  const end_time = await req.body.end_time;
  const description = await req.body.description;
  const image = await req.body.image;
  const categories = await req.body.categories;
  const price = await req.body.price;
  const external_event = await req.body.external_event;
  const attendance_id = await req.body.attendance_id;
  const newEvent = await event.create({
    author_name: author_name,
    author_id: author_id,
    title: title,
    location: location,
    star_rating: star_rating,
    date: date,
    start_time: start_time,
    end_time: end_time,
    description: description,
    image: image,
    categories: categories,
    price: price,
    external_event: external_event,
    attendance_id: attendance_id,
  });
  return res.status(200).json(newEvent);
};

//DELETE Event with event_id

export const deleteEventById = async (req, res) => {
  // const event_id = await req.body.event_id;
  const event_id = await req.params.event_id;

  const deleteEvent = await event.deleteOne({ _id: event_id });
  return res.status(200).json(deleteEvent);
};

//GET Event with event_id

export const getEventById = async (req, res) => {
  const event_id = await req.params.event_id;
  const getEvent = await event.find({ _id: event_id });
  return res.status(200).json(getEvent);
};

//PATCH (update) a Event's details

export const updateEventById = async (req, res) => {
  const event_id = await req.params.event_id;

  const author_name = await req.body.author_name;
  const author_id = await req.body.author_id;
  const title = await req.body.title;
  const location = await req.body.location;
  const star_rating = await req.body.star_rating;
  const date = await req.body.date;
  const start_time = await req.body.start_time;
  const end_time = await req.body.end_time;
  const description = await req.body.description;
  const image = await req.body.image;
  const categories = await req.body.categories;
  const price = await req.body.price;
  const external_event = await req.body.external_event;
  const attendance_id = await req.body.attendance_id;

  const updatedEvent = {
    author_name: author_name,
    author_id: author_id,
    title: title,
    location: location,
    star_rating: star_rating,
    date: date,
    start_time: start_time,
    end_time: end_time,
    description: description,
    image: image,
    categories: categories,
    price: price,
    external_event: external_event,
    attendance_id: attendance_id,
  };

  await event.findByIdAndUpdate(event_id, updatedEvent);
  const returnedUpdatedEvent = await event.findById(event_id);
  res.send({ updateEvent: "Event successfully updated", returnedUpdatedEvent });
};

//PATCH (join) a Event with user_id

export const joinEventById = async (req, res) => {
  const event_id = await req.params.event_id;
  const user_id = await req.body.user_id;
  const updatedEvent = {
    $push: { attendance_id: [user_id] },
  };

  await event.findByIdAndUpdate(event_id, updatedEvent);
  const returnedUpdatedEvent = await event.findById(event_id);
  res.send({ updateEvent: "Event successfully joined", returnedUpdatedEvent });
};

//DELETE (quit) an Attended Event In a User

export const quitEventById = async (req, res) => {
  const event_id = await req.params.event_id;
  const user_id = await req.body.user_id;
  const updatedEvent = {
    $pullAll: { attendance_id: [user_id] },
  };

  await event.findByIdAndUpdate(event_id, updatedEvent);
  const returnedUpdatedEvent = await event.findById(event_id);
  res.send({ updateEvent: "Event successfully quited", returnedUpdatedEvent });
};

// GET Host Event In a User

export const getHostEvent = async (req, res) => {
  const user_id = await req.params.user_id;
  const getEvent = await event.find({ author_id: user_id });
  return res.status(200).json(getEvent);
};

// GET Joined Event In a User

export const getJoinedEvent = async (req, res) => {
  const user_id = await req.params.user_id;
  const getEvent = await event.find({ attendance_id: user_id });
  return res.status(200).json(getEvent);
};
