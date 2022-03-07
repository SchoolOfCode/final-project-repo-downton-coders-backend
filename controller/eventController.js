import event from "../models/events.js";
import asyncHandler from 'express-async-handler'

//GET All Events

export const getEvents = asyncHandler(async (req, res) => {
  const Event = await event.find();
  res.status(200).json(Event);
})

//POST a New Event

// export const createEvent = async (req, res) => {
//   const {author_name, author_id, title, location, star_rating,date,start_time, end_time, description, image,categories, price, external_event, attendance_id} = req.body
//   // const author_name = await req.body.author_name;
//   // const author_id = await req.body.author_id;
//   // const title = await req.body.title;
//   // const location = await req.body.location;
//   // const star_rating = await req.body.star_rating;
//   // const date = await req.body.date;
//   // const start_time = await req.body.start_time;
//   // const end_time = await req.body.end_time;
//   // const description = await req.body.description;
//   // const image = await req.body.image;
//   // const categories = await req.body.categories;
//   // const price = await req.body.price;
//   // const external_event = await req.body.external_event;
//   // const attendance_id = await req.body.attendance_id;
//   // if(!author_name || !author_id || !title || !location || !star_rating
//   //   || !date || !start_time)
//   const newEvent = await event.create({
//     author_name: author_name,
//     author_id: author_id,
//     title: title,
//     location: location,
//     star_rating: star_rating,
//     date: date,
//     start_time: start_time,
//     end_time: end_time,
//     description: description,
//     image: image,
//     categories: categories,
//     price: price,
//     external_event: external_event,
//     attendance_id: attendance_id,
//   });
//   return res.status(200).json(newEvent);
// };


//@description     Create single Event
//@route           POST /api/events/create
//@access          Private
 export const createEvent = asyncHandler(async (req, res) => {
  const { title, location,date,start_time, end_time, description,author_username, image,categories, price, external_event} = req.body;

  if (!title || !location || !date
  || !start_time || !end_time || !description || !author_username || !image || !categories || !price || !external_event) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const Event = new event({ User: req.User._id, title, author_username, description, location, start_time, end_time, date, image, categories, price, external_event});

    const createdEvent = await Event.save();

    res.status(201).json(createdEvent);
  }
});

export const getEventById = asyncHandler(async (req, res) => {
  const Event = await event.findById(req.params.id);

  if (Event) {
    res.json(Event);
  } else {
    res.status(404).json({ message: "Event not found" });
  }

  res.json(Event);
});

//GET Events by search location

export const getEventsBySearchLocation = async (req, res) => {
  const location = await req.body.location;
  const getEvent = await event.find({
  location: { $regex: location, $options: "i" },
  });
  
  return res.status(200).json(getEvent);
  };
  
  //GET Events by search category
  
  export const getEventsBySearchCategory = async (req, res) => {
  const category = await req.body.category;
  const getEvent = await event.find({
  categories: { $regex: category, $options: "i" },
  });
  
  return res.status(200).json(getEvent);
  };

//DELETE Event with event_id
//@description     Delete single Event
//@route           GET /events/:id
//@access          Private
export const deleteEvent = asyncHandler(async (req, res) => {
  const Event = await event.findById(req.params.id);

  if (Event.User.toString() !== req.User._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (Event) {
    await Event.remove();
    res.json({ message: "Event Removed" });
  } else {
    res.status(404);
    throw new Error("Event not Found");
  }
});


// export const deleteEventById = async (req, res) => {
//   // const event_id = await req.body.event_id;
//   const event_id = await req.params.event_id;

//   const deleteEvent = await event.deleteOne({ _id: event_id });
//   return res.status(200).json(deleteEvent);
// };

//GET Event with event_id

// export const getEventById = async (req, res) => {
//   const event_id = await req.params.event_id;
//   const getEvent = await event.find({ _id: event_id });
//   return res.status(200).json(getEvent);
// };

//PATCH (update) a Event's details

//@desc    Update a Event
// @route   PUT /api/events/:id
// @access  Private
export const updateEvent = asyncHandler(async (req, res) => {
  const { title, location, categories, description, image, date, star_rating, start_time, end_time, price, external_event, attendance_id } = req.body;

  const Event = await event.findById(req.params.id);

  if (Event.User.toString() !== req.User._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (Event) {
    Event.title = title;
    Event.location = location;
    Event.categories = categories;
    Event.date = date;
    Event.start_time = start_time;
    Event.end_time = end_time;
    Event.description = description;
    Event.price = price;
    Event.external_event = external_event;
    Event.attendance_id = attendance_id;
    Event.image = image;
    Event.star_rating = star_rating;
    

    const updatedEvent = await Event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

// export const updateEventById = async (req, res) => {
//   const event_id = await req.params.event_id;

//   const author_name = await req.body.author_name;
//   const author_id = await req.body.author_id;
//   const title = await req.body.title;
//   const location = await req.body.location;
//   const star_rating = await req.body.star_rating;
//   const date = await req.body.date;
//   const start_time = await req.body.start_time;
//   const end_time = await req.body.end_time;
//   const description = await req.body.description;
//   const image = await req.body.image;
//   const categories = await req.body.categories;
//   const price = await req.body.price;
//   const external_event = await req.body.external_event;
//   const attendance_id = await req.body.attendance_id;

//   const updatedEvent = {
//     author_name: author_name,
//     author_id: author_id,
//     title: title,
//     location: location,
//     star_rating: star_rating,
//     date: date,
//     start_time: start_time,
//     end_time: end_time,
//     description: description,
//     image: image,
//     categories: categories,
//     price: price,
//     external_event: external_event,
//     attendance_id: attendance_id,
//   };

//   await event.findByIdAndUpdate(event_id, updatedEvent);
//   const returnedUpdatedEvent = await event.findById(event_id);
//   res.send({ updateEvent: "Event successfully updated", returnedUpdatedEvent });
// };

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
