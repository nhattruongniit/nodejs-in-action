const pg = require('pg');
const db = new pg.Client({
  database: 'articles'
})

db.connect((err, client) => {
  if(err) throw err;
  console.log('Connected to database', db.database);
  
  // insert data
  db.query(`
    SELECT * FROM snippets ORDER BY id
  `,(err, result) => {
    if(err) throw err;
    console.log('Rows: ', result.rows);
    db.end();

  })
})