const express = require("express");
const postsRoutes = require("./posts.js");
const commentsRoutes = require("./comments.js");

const router = express.Router();

router.use("/posts", postsRoutes);
router.use("/comments", commentsRoutes);

module.exports = router;
