import express from "express";
import mongoose from "mongoose";
import DB_URL from "../config.js";
import user from "../models/users.js"
import comment from "../models/comments.js";

const router = express.Router();
mongoose.connect(DB_URL, () => {
  console.log("Yes! We are connected")
});



// CREATE USERS
router.post("/", async function (req, res, next) {
  const name = await req.body.name;
  const surname = await req.body.surname;
  const username = await req.body.username;
  const age = await req.body.age;
  const email = await req.body.email;
  const hobbies = await req.body.hobbies;
  const newUser = await user.create({
    "name": name,
    "surname": surname,
    "username": username,
    "age": age,
    "email": email,
    "hobbies": hobbies
  })
  res.send({"newUser": newUser})

})

// CREATE COMMENTS 
router.post("/comments", async function (req, res, next) {
  const author_id = await req.body.author_id;
  const body = await req.body.body;
  const newComment = await comment.create({
    "author_id": author_id,
    "body": body,

  })
res.send({"newComment": newComment});
})

export default router;
