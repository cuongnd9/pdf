const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('<h3>👋 Hello</h3>'));

app.listen(6969, () => {
  console.log(`Server started on 6969`);
});
