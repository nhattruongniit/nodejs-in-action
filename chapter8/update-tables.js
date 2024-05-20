const pg = require('pg');
const db = new pg.Client({
  database: 'articles'
})

db.connect((err, client) => {
  if(err) throw err;
  console.log('Connected to database', db.database);
  
  const id = 1
  const updatedBody = 'greetings, world';
  db.query(`
    UPDATE snippets SET (body) VALUES (
      '${updatedBody}'
    ) WHERE id = ${id}
  `, () => {
    if (err) throw err;
    console.log('Update row with id %s', result.rowCount);
    db.end();
  });
})