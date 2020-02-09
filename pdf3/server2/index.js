const fs = require('fs');
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res) => res.send('<h3>👋 Hello</h3>'));
app.get('/api', async (req, res) => {
  axios(`http://localhost:8000/api`, {
    method: 'GET',
    responseType: 'arraybuffer'
  })
    .then(response => res.send(response.data))
    .catch(err => console.log(err));
});

app.listen(8100, () => {
  console.log(`Server started on 8100`);
});
