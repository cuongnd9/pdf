const fs = require('fs');
const express = require('express');
const cors = require('cors');
const pdf = require('html-pdf');

const app = express();

app.use(cors());

app.get('/', (req, res) => res.send('<h3>👋 Hello</h3>'));
app.get('/api', (req, res) => {
  const html = fs.readFileSync('./index.html', 'utf8');
  const options = {
    header: {
      height: '20mm',
      contents: '<div/>'
    },
    footer: {
      height: '20mm',
      contents: '<div style="text-align: center; font-size: 10px; color: #1890fe">Save Money Corporation</div>'
    },
    format: 'A4',
  }
  pdf.create(html, options).toBuffer((err, buffer) => {
    res.set({
      'Content-Type': 'application/pdf',
    });
    res.send(buffer);
  });
});

app.listen(6969, () => {
  console.log(`Server started on 6969`);
});
