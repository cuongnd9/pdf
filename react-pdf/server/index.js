const fs = require('fs');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res) => res.send('<h3>👋 Hello</h3>'));
app.get('/api', async (req, res) => {
  const content = fs.readFileSync('./index.html', 'utf8');
  res.json(content);
});

app.listen(6969, () => {
  console.log(`Server started on 6969`);
});
