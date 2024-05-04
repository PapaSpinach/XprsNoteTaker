const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs/promises');

const dbLocation = path.join(__dirname, './db/db.json');

router.get('/notes', async (req, res) => {
  const notes = await loadNotes();
  res.send(notes);
});

async function loadNotes() {
  const content = await fs.readFile(dbLocation);
  return JSON.parse(content);
}

module.exports = router;