const express = require('express');
const path = require('path');

const app = express();
const distDir = path.join(__dirname, 'dist');

app.use(express.static(`${__dirname}/dist/`));

app.use('/', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${PORT}!`);
});
