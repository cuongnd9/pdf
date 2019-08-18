const fs = require('fs');
const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();

app.use(cors());

app.get('/', (req, res) => res.send('<h3>👋 Hello</h3>'));
app.get('/api', async (req, res) => {
  const content = fs.readFileSync('./index.html', 'utf8');
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setContent(content)
  const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
          left: '0px',
          top: '0px',
          right: '0px',
          bottom: '0px'
      }
  })
  await browser.close()
  res.send(buffer);
});

app.listen(6969, () => {
  console.log(`Server started on 6969`);
});
