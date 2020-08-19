const express = require("express");
const path = require("path");

const indexRouter = require("./routes/index");

const app = express();

const port = 8080;

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

app.listen(port, function () {
  console.log("Server Running on : " + port);
});
