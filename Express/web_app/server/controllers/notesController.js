
let notes = [];

export const getNotes = (req, res) => {
  try {
 
    const userNotes = notes.filter(
      (note) => note.userEmail === req.user.email
    );

    res.json(userNotes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
};

export const createNote = (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      userEmail: req.user.email,
    };

    notes.push(newNote);

    res.status(201).json({
      message: "Note created",
      note: newNote,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating note" });
  }
};


export const updateNote = (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const noteIndex = notes.findIndex(
      (n) => n.id === id && n.userEmail === req.user.email
    );

    if (noteIndex === -1) {
      return res.status(404).json({ message: "Note not found" });
    }

    notes[noteIndex] = {
      ...notes[noteIndex],
      title,
      content,
    };

    res.json({
      message: "Note updated",
      note: notes[noteIndex],
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating note" });
  }
};


export const deleteNote = (req, res) => {
  try {
    const { id } = req.params;

    const noteIndex = notes.findIndex(
      (n) => n.id === id && n.userEmail === req.user.email
    );

    if (noteIndex === -1) {
      return res.status(404).json({ message: "Note not found" });
    }

    const deletedNote = notes.splice(noteIndex, 1);

    res.json({
      message: "Note deleted",
      note: deletedNote[0],
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note" });
  }
};