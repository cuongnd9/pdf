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
  console.log('buffer to string ---------------', buffer.toString('base64'))
  // res.set('Content-Type', 'application/pdf; charset=utf-8');
  console.log(res.get('Content-Type'), '----------------------------');
  // res.send(buffer)
  res.json(buffer.toString('base64'))
});

app.listen(6969, () => {
  console.log(`Server started on 6969`);
});
