const { readData, writeData } = require("../utils/fileHandler");

function getAllNotes() {
  return readData();
}

function createNote(title, content) {
  const notes = readData();

  const newNote = {
    id: Date.now(),
    title,
    content,
  };

  notes.push(newNote);
  writeData(notes);

  return newNote;
}

function updateNote(id, title, content) {
  let notes = readData();

  notes = notes.map((note) =>
    note.id === id ? { ...note, title, content } : note,
  );

  writeData(notes);
}

function deleteNote(id) {
  let notes = readData();

  notes = notes.filter((note) => note.id !== id);

  writeData(notes);
}

module.exports = {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
};
