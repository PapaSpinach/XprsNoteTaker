const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs/promises');
const crypto = require('crypto');

const dbLocation = path.join(__dirname, './db/db.json');

router.get('/notes', async (req, res) => {
  const notes = await loadNotes();
  res.send(notes);
});

router.post('/notes', async (req, res) => {
  const note = req.body;

  note.id = generateUniqueId();

  const notes = await loadNotes();

  notes.push(note);

  await saveNotes(notes);

  res.sendStatus(200);
});

router.delete('/notes/:id', async (req, res) => {
  const notes = await loadNotes();

  const newNotes = notes.filter((note) => note.id !== req.params.id);

  await saveNotes(newNotes);

  res.sendStatus(200);
});

async function loadNotes() {
  const content = await fs.readFile(dbLocation);
  return JSON.parse(content);
}

async function saveNotes(notes) {
  await fs.writeFile(dbLocation, JSON.stringify(notes, null, 2));
}

function generateUniqueId() {
  return crypto.randomBytes(16).toString('hex');
}

module.exports = router;
