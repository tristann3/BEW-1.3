const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/", (req, res) => {
  var currentUser = req.user;

  posts = Post.find({})
    .lean()
    .then((posts) => {
      console.log(currentUser);
      res.render("posts-index", { posts, currentUser });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/new", (req, res) => {
  var currentUser = req.user;

  // console.log(req.body);
  res.render("posts-new", { currentUser });
});

router.get("/:id", (req, res) => {
  var currentUser = req.user;

  // LOOK UP THE POST
  Post.findById(req.params.id)
    .lean()
    .populate("comments")
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

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect("/");
    });
  } else {
    return res.status(401); //UNAUTHORIZED
  }
});

module.exports = router;
