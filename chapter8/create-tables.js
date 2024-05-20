const pg = require('pg');
const db = new pg.Client({
  database: 'articles'
})

db.connect((err) => {
  if(err) throw err;
  console.log('Connected to database', db.database);
  
  // define schema
  db.query(`
    CREATE TABLE IF NOT EXISTS snippets (
      id SERIAL,
      PRIMARY KEY(id),
      body text
    );  
  `, (err) => {
    if(err) throw err;
    console.log('Created table snippets');
    db.end();
  })
})