let notes = require("../data/notes");

exports.getNotes = (req, res) => {
  res.json(notes);
};

exports.getNote = (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find((n) => n.id === id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
};

exports.createNote = (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required",
    });
  }

  const newNote = {
    id: Date.now(),
    title,
    content,
  };

  notes.push(newNote);

  res.status(201).json({
    message: "Note created successfully",
    note: newNote,
  });
};

exports.updateNote = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;

  const note = notes.find((n) => n.id === id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  note.title = title || note.title;
  note.content = content || note.content;

  res.json({
    message: "Note updated successfully",
    note,
  });
};

exports.deleteNote = (req, res) => {
  const id = parseInt(req.params.id);

  const index = notes.findIndex((n) => n.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  notes.splice(index, 1);

  res.json({
    message: "Note deleted successfully",
  });
};
