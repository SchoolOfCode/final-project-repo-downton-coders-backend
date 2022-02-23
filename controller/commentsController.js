import comment from "../models/comments.js";

// GET ALL COMMENTS

export const getComments = async (req, res) => {
    const comments = await comment.find();
    // res.send(comments);
    res.status(200).json(comments);
};

// GET COMMENTS BY USER ID

export const getCommentsByUserId = async (req, res) => {
    console.log("accessing function")
    const id = String(req.params.id); 
    console.log("id:", id)
    const comments = await comment.find({author_id: id});
    // res.send(comments);
    res.status(200).json(comments);
};

// CREATE COMMENTS

export const createComment = async (req, res) => {
    const author_id = await req.body._id;
    const body = await req.body.text;
    const newComment = await comment.create({
      "author_id": author_id,
      "body": body,
    })
    res.send({"newComment": newComment});
    res.status(201).json({message: 'Comment created.'})
};

