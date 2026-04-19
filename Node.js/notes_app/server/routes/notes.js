const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/notes.json");

function getNotes() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data || "[]");
}

function saveNotes(notes) {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}
function handleNotes(req, res) {
  const url = req.url;
  const method = req.method;

  if (url === "/notes" && method === "GET") {
    const notes = getNotes();
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(notes));
  }

  if (url === "/notes" && method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { title, content } = JSON.parse(body);
      const notes = getNotes();

      const newNote = {
        id: Date.now(),
        title,
        content,
      };

      notes.push(newNote);
      saveNotes(notes);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newNote));
    });

    return;
  }

  if (url.startsWith("/notes/") && method === "PUT") {
    const id = parseInt(url.split("/")[2]);
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { title, content } = JSON.parse(body);
      let notes = getNotes();

      notes = notes.map((note) =>
        note.id === id ? { ...note, title, content } : note,
      );

      saveNotes(notes);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Updated" }));
    });

    return;
  }

  if (url.startsWith("/notes/") && method === "DELETE") {
    const id = parseInt(url.split("/")[2]);

    let notes = getNotes();
    notes = notes.filter((note) => note.id !== id);

    saveNotes(notes);

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Deleted" }));
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
}

module.exports = { handleNotes };
