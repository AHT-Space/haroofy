const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");
const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
// app.use((req, res, next) => {
//     console.log("cookies from backend--->", req.cookies);
//     next();
// }); 

app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/posts`, postRouter);
app.use(`/api/v1/comments`, commentRouter);

module.exports = app;