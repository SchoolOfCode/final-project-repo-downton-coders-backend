import express from 'express';
import path from 'path';
import __dirname  from './dirname.js';
import cookieParser  from 'cookie-parser';
import cors  from 'cors';
import logger  from 'morgan';
import connectDB from './db/connection.js';

import usersRouter  from './routes/usersRouter.js';
import commentRouter from "./routes/commentRouter.js";
const messages = [];
connectDB()

const app = express();
import io from "./io.cjs";

io.on('connection', socket => {
  socket.emit('message', ({name, message}) => {
    io.emit('message', {name, message});
    messages.push({"name": name, "message": message});
  });
})

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/users', usersRouter);
app.use('/comments', commentRouter);
app.use(function (req, res, next) {
  res.status(404).json({message: "We couldn't find what you were looking for 😞"})
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json(err)
})

export default app;
