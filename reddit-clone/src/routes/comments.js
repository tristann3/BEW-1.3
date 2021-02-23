const express = require("express");
const router = express.Router();

const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");

// CREATE Comment
router.post("/:postId", function (req, res) {
  // INSTANTIATE INSTANCE OF MODEL
  const comment = new Comment(req.body);
  comment.author = req.user._id;

  // SAVE INSTANCE OF Comment MODEL TO DB
  comment
    .save()
    .then((comment) => {
      return User.findById(req.user._id);
    })
    .then((user) => {
      user.comments.unshift(comment);
      user.save();
      return Post.findById(req.params.postId);
    })
    .then((post) => {
      post.comments.unshift(comment);
      post.save();
      res.redirect(`/posts/${post._id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
