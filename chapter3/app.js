const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 9000;

const articles = [
  {
    title: "Example"
  }
];

// use body parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// gets all articles
app.get("/articles", (req, res, next) => {
  res.send(articles[0]);
});

// create an article
app.post("/articles", (req, res, next) => {
  const article = { title: req.body.title };
  articles.push(article);
  res.send(article);
});

// get a single article
app.get("/articles/:id", (req, res, next) => {
  const id = req.params.id;
  console.log("Fetching: ", id);
  res.send(articles[id]);
});

// delete an article
app.delete("/articles/:id", (req, res, next) => {
  const id = req.params.id;
  console.log("Deleting: ", id);
  delete articles[id];
  res.send({ message: "Deleted" });
});

app.listen(port, () => {
  console.log(`App started on port: localhost:${port}`);
});

module.exports = app;
