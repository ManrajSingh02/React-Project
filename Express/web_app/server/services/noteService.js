let notes = [];

export const getUserNotes = (email) =>
  notes.filter((n) => n.userEmail === email);

export const createUserNote = (title, content, email) => {
  const note = {
    id: Date.now().toString(),
    title,
    content,
    userEmail: email,
  };

  notes.push(note);
  return note;
};

export const updateUserNote = (id, title, content, email) => {
  const note = notes.find((n) => n.id === id && n.userEmail === email);

  if (!note) {
    return null;
  }

  note.title = title;
  note.content = content;

  return note;
};

export const deleteUserNote = (id, email) => {
  const noteIndex = notes.findIndex((n) => n.id === id && n.userEmail === email);

  if (noteIndex === -1) {
    return null;
  }

  const [deletedNote] = notes.splice(noteIndex, 1);
  return deletedNote;
};
