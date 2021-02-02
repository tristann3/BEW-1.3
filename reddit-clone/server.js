const { response } = require("express");
const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("", (req, res) => {
  res.render("layouts/main");
});

app.listen(3000, () => {
  console.log("Listening on Port 3000!");
});
