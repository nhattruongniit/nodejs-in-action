const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    if (req.url === "/") {
      fs.readFile("./mocks/titles.json", (err, data) => {
        if (err) {
          console.log(err);
          res.end("Server error");
        } else {
          const titles = JSON.parse(data.toString());
          fs.readFile("./blog_recent/template.html", (err, data) => {
            if (err) {
              console.log(err);
              res.end("Server error");
            } else {
              const tmpl = data.toString();
              const html = tmpl.replace("%", titles.join("</li><li>"));
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(html);
            }
          });
        }
      });
    }
  })
  .listen(8000, "localhost");
