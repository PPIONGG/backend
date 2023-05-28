const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongoose").Types;
const Post = require("../Backend/Models/Post.js");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().exec();
    res.send(posts);
  } catch (err) {
    console.error("Error Occurred While Fetching Data:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      username: req.body.username,
    });
    const savedPost = await post.save();
    res.send(savedPost);
  } catch (err) {
    console.error("Internal Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (ObjectId.isValid(id)) {
    try {
      const post = await Post.findById(id).exec();
      if (post) {
        res.send(post);
      } else {
        res.status(404).send("No record found with this id");
      }
    } catch (err) {
      console.error("Internal Error:", err);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(400).send("Invalid id");
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (ObjectId.isValid(id)) {
    try {
      const deletedPost = await Post.findByIdAndRemove(id).exec();
      if (deletedPost) {
        res.send(deletedPost);
      } else {
        res.status(404).send("No record found with this id");
      }
    } catch (err) {
      console.error("Internal Error:", err);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(400).send("Invalid id");
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (ObjectId.isValid(id)) {
    const post = {
      title: req.body.title,
      content: req.body.content,
      username: req.body.username,
    };
    try {
      const updatedPost = await Post.findByIdAndUpdate(id, post, {
        new: true,
      }).exec();
      if (updatedPost) {
        res.send(updatedPost);
      } else {
        res.status(404).send("No record found with this id");
      }
    } catch (err) {
      console.error("Internal Error:", err);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(400).send("Invalid id");
  }
});

module.exports = router;
