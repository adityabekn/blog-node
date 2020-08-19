var express = require("express");
var matter = require("gray-matter");
var router = express.Router();
var path = require("path");
var fs = require("fs");

router.get("/", function (req, res) {
  const posts = fs
    .readdirSync(path.join(__dirname, "../content"))
    .filter((file) => file.endsWith(".md"));
  var title = [];
  var description = [];
  var slug = [];
  var date = [];
  var tag = [];
  for (i = 0; i < posts.length; i++) {
    var file = matter.read(path.join(__dirname, "../content/") + posts[i]);
    title[i] = file.data.title;
    description[i] = file.data.description;
    slug[i] = file.data.slug;
    date[i] = file.data.date;
    tag[i] = file.data.tag;
  }
  res.render("pages/index", {
    title: title,
    desc: description,
    slug: slug,
    date: date,
    tag: tag,
  });
});

router.get("/:article", function (req, res) {
  const file = matter.read(
    path.join(__dirname, "../content/") + req.params.article + ".md"
  );

  var markdown = require("markdown-it")();
  let content = file.content;
  var result = markdown.render(content);

  res.render("pages/article", {
    post: result,
    title: file.data.title,
    description: file.data.description,
    date: file.data.date,
  });
});

module.exports = router;
