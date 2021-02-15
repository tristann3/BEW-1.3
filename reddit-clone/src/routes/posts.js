const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/", (req, res) => {
  posts = Post.find({})
    .lean()
    .then((posts) => {
      res.render("posts-index", { posts });
    })
    .catch((err) => {
      console.log(err.message);
    });
  console.log("at / route");
});

router.get("/new", (req, res) => {
  console.log(req.body);
  res.render("posts-new");
});

router.post("/new", (req, res) => {
  // INSTANTIATE INSTANCE OF POST MODEL
  const post = new Post(req.body);

  // SAVE INSTANCE OF POST MODEL TO DB
  post.save((err, post) => {
    // REDIRECT TO THE ROOT
    return res.redirect("/");
  });
});

module.exports = router;