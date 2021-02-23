require("dotenv/config");
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
// Set db
require("./data/reddit-db");

const Post = require("./models/post");

const app = express();

app.use(express.static("src/public"));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (
    typeof req.cookies.nToken === "undefined" ||
    req.cookies.nToken === null
  ) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);

// All middlewares above this comment
const router = require("./routes/index.js");
app.use(router);

app.get("/", (req, res) => {
  var currentUser = req.user;

  posts = Post.find({})
    .lean()
    .populate("author")
    .then((posts) => {
      res.render("posts-index", { posts, currentUser });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// SUBREDDIT
// SUBREDDIT
app.get("/n/:subreddit", function (req, res) {
  var currentUser = req.user;
  Post.find({ subreddit: req.params.subreddit })
    .lean()
    .then((posts) => {
      res.render("posts-index", { posts, currentUser });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});

module.exports = app;
