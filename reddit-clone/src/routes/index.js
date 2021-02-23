const express = require("express");
const postsRoutes = require("./posts.js");
const commentsRoutes = require("./comments.js");
const authRoutes = require("./auth.js");
const replyRoutes = require("./replies.js");

const router = express.Router();

router.use("/posts", replyRoutes);
router.use("/posts", postsRoutes);
router.use("/comments", commentsRoutes);
router.use("/auth", authRoutes);

module.exports = router;
