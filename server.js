const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const distDir = path.join(__dirname, 'dist');

app.use(express.static(`${__dirname}/dist/`));

app.use('/', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});
app.listen(process.env.PORT || PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT || PORT}!`);
});
