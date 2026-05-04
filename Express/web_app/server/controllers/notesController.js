import {
  createUserNote,
  deleteUserNote,
  getUserNotes,
  updateUserNote,
} from "../services/noteService.js";

export const getNotes = (req, res) => {
  try {
    const notes = getUserNotes(req.user.email);

    res.json({
      notes,
    });
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

    const newNote = createUserNote(title, content, req.user.email);

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
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "All fields required" });
    }

    const updatedNote = updateUserNote(
      req.params.id,
      title,
      content,
      req.user.email
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({
      message: "Note updated",
      note: updatedNote,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating note" });
  }
};

export const deleteNote = (req, res) => {
  try {
    const deletedNote = deleteUserNote(req.params.id, req.user.email);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({
      message: "Note deleted",
      note: deletedNote,
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note" });
  }
};
