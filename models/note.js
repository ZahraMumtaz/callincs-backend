const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  content: { type: String, required: true },
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
