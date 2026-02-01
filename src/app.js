const express = require("express");
const postModel = require("./models/post.model");
const multer = require("multer");
const uploadFile = require("./services/storage.service");

// this file is used to define routes and middlewares

const app = express();
app.use(express.json()); // middleware to parse json data

// we want to read a file hence use multer
const upload = multer({storage: multer.memoryStorage()}); 

// route to create a post
app.post("/create-post", upload.single("image"), async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  const {caption} = req.body;

  if (!req.file || caption === undefined) {
    res.status(400).json({
      message: "Input Fields Are Missing",
    });
  }
  try {
    const response = await uploadFile(req.file.buffer);

    if (!response) {
      res.status(400).json({
        message: "File Upload Failed",
      });
    }

    // console.log(response);
    const post = await postModel.create({
      image: response.url,
      caption: req.body.caption,
    });

    if (!post) {
      return res.status(500).json({
        message: "Post Creation Failed",
      });
    }

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});

// route to get all posts
app.get("/posts", async (req, res) => {
  const posts = await postModel.find({});

  if (posts.length === 0) {
    return res.status(404).json({
      message: "No Posts Found",
    });
  }

  return res.status(200).json({
    message: "Posts fetched successful",
    posts,
  });
});

module.exports = app;
