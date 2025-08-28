const express = require('express');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Hello Flowise SaaS!'));

app.get('/db', async (req, res) => {
  try {
    const client = new Client({
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });
    await client.connect();
    const result = await client.query('select current_database(), current_user, inet_server_addr()');
    await client.end();
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(port, () => console.log(`App listening on port ${port}`));
