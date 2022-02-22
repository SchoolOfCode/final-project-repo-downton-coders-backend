router.post("/comments", async function (req, res, next) {
    const author_id = await req.body.author_id;
    const body = await req.body.body;
    const newComment = await comment.create({
      "author_id": author_id,
      "body": body,
  
    })
  res.send({"newComment": newComment});
  })
  