const sqlite3 = require("sqlite3").verbose();
const dbName = "later.sqlite";
const db = new sqlite3.Database(dbName);

// create a table
// how to create a table in sqlite3 with Articles
db.serialize(() => {
  const sql = `
    CREATE TABLE IF NOT EXISTS articles
      (id integer primary key, title, content TEXT)
  `;
  db.run(sql);
});
// create models Article
class Article {
  static all(cb) {
    db.all("SELECT * FROM articles", cb);
  }

  static find(id, cb) {
    db.get("SELECT * FROM articles WHERE id = ?", id, cb);
  }

  static create(data, cb) {
    const sql = "INSERT INTO articles(title, content) VALUES (?, ?)";
    db.run(sql, data.title, data.content, cb);
  }

  static delete(id, cb) {
    if (!id) return cb(new Error("Please provide an id"));
    db.run("DELETE FROM articles WHERE id = ?", id, cb);
  }
}

module.exports.Article = Article;
