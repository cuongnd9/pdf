const express = require('express');
const fs = require('fs');
const pdf = require('html-pdf');

const app = express();

app.get('/', (req, res) => res.send('<h3>👋 Hello</h3>'));
app.get('/api', (req, res) => {
  const html = fs.readFileSync('./index.html', 'utf8');
  pdf.create(html).toBuffer(function(err, buffer){
     res.json(buffer);
  });
})

app.listen(6969, () => {
  console.log(`Server started on 6969`);
});
