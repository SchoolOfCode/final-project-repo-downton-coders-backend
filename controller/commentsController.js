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
    console.log(req.body)
    const author_id =  req.body.author_id;
    const body =  req.body.text;
    console.log(author_id, body)
    const newComment = await comment.create({
      "author_id": author_id,
      "text": body,
    })
    res.send({"newComment": newComment});
    // res.status(201).json({message: 'Comment created.'})
};

