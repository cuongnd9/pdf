const fs = require('fs');
const express = require('express');
const cors = require('cors');
const pdf = require('html-pdf');

const app = express();

app.use(cors());

app.get('/', (req, res) => res.send('<h3>👋 Hello</h3>'));
app.get('/api', (req, res) => {
  const html = fs.readFileSync('./index.html', 'utf8');
  pdf.create(html).toBuffer(function(err, buffer) {
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdf.length
    });
    res.send(buffer);
  });
});

app.listen(6969, () => {
  console.log(`Server started on 6969`);
});
