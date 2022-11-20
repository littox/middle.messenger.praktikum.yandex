const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const distDir = path.join(__dirname, 'dist');

app.get('/', function(req, res) {
  res.sendFile(path.join(distDir, 'auth.html'));
});
app.use(express.static(`${__dirname}/dist/`));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});