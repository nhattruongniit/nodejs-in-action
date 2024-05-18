const express = require("express");
const read = require("node-readability");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 9000;

const Article = require('./models/Article').Article;

// use body parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// bootstrap css
app.use(
  '/css/bootstrap.css',
  express.static('node_modules/bootstrap/dist/css/bootstrap.min.css')
)

// gets all articles
app.get("/articles", (_, res, next) => {
  Article.all((err, articles) => {
    if(err) return next(err);
    res.format({
      html: () => {
        res.render('articles.ejs', { articles:articles  })
      },
      json: () => {
        res.send(articles)
      }
    })
  })
});

// create an article
app.post("/articles", (req, res, next) => {
  const url = req.body.url;
  read(url, (err, result) => {
    if(err || !result) res.status(500).send("Error downloading article");

    Article.create({ title: result.title, content: result.content }, (err) => {
      if(err) return next(err);
      res.send({ message: "Article created" });
    });
  })
});

// get a single article
app.get("/articles/:id", (req, res, next) => {
  const id = req.params.id;
  Article.find(id, (err, articles) => {
    if(err) return next(err);
    res.send(articles)
  })
});

// delete an article
app.delete("/articles/:id", (req, res, next) => {
  const id = req.params.id;
  Article.delete(id, (err) => {
    if(err) return next(err);
    res.send({ message: 'Deleted' })
  })
});

app.listen(port, () => {
  console.log(`App started on port: localhost:${port}`);
});

module.exports = app;
