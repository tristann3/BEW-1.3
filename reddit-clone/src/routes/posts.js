const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");

router.get("/", (req, res) => {
  var currentUser = req.user;
  console.log(req.cookies);

  Post.find({})
    .lean()
    .populate("author")
    .then((posts) => {
      res.render("posts-index", { posts, currentUser });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/new", (req, res) => {
  var currentUser = req.user;
  res.render("posts-new", { currentUser });
});

router.get("/:id", (req, res) => {
  var currentUser = req.user;

  // LOOK UP THE POST
  Post.findById(req.params.id)
    .lean()
    .populate("comments")
    .populate("author")
    .then((post) => {
      res.render("posts-show", { post, currentUser });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.post("/new", (req, res) => {
  if (req.user) {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);
    post.author = req.user._id;

    // SAVE INSTANCE OF POST MODEL TO DB
    post
      .save()
      .then((post) => {
        return User.findById(req.user._id);
      })
      .then((user) => {
        user.posts.unshift(post);
        user.save();
        // REDIRECT TO THE NEW POST
        res.redirect(`/posts/${post._id}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  } else {
    return res.status(401); // UNAUTHORIZED
  }
});

module.exports = router;
