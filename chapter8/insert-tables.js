const pg = require('pg');
const db = new pg.Client({
  database: 'articles'
})

db.connect((err, client) => {
  if(err) throw err;
  console.log('Connected to database', db.database);
  
  // insert data
  const body = 'hello word';
  db.query(`
    INSERT INTO snippets (body) VALUES (
      '${body}'
    )
    RETURNING id
  `,(err, result) => {
    if(err) throw err;
    const id = result.rows[0].id;
    console.log('Inserted row with id: ', id);
    db.end();
  })
})