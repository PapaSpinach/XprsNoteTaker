const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const apiRoutes = require('./api');

app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
