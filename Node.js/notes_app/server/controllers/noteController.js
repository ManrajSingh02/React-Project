const {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../services/noteService");


function handleGetNotes(req, res) {
  try {
    const notes = getAllNotes();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(notes));
  } catch (err) {
    res.writeHead(500);
    res.end("Error fetching notes");
  }
}


function handleCreateNote(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      const parsed = JSON.parse(body);
      const { title, content } = parsed;

      if (!title || !content) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Missing fields" }));
      }

      const note = createNote(title, content);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(note));
    } catch (err) {
      console.error("JSON Error:", err);

      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid JSON" }));
    }
  });
}


function handleUpdateNote(req, res, id) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      const parsed = JSON.parse(body);
      const { title, content } = parsed;

      updateNote(id, title, content);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Updated successfully" }));
    } catch (err) {
      res.writeHead(400);
      res.end("Invalid JSON");
    }
  });
}

function handleDeleteNote(req, res, id) {
  try {
    deleteNote(id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Deleted successfully" }));
  } catch (err) {
    res.writeHead(500);
    res.end("Delete failed");
  }
}


module.exports = {
  handleGetNotes,
  handleCreateNote,
  handleUpdateNote,
  handleDeleteNote,
};