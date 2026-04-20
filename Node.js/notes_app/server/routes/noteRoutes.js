const {
  handleGetNotes,
  handleCreateNote,
  handleUpdateNote,
  handleDeleteNote,
} = require("../controllers/noteController");

function handleNoteRoutes(req, res, pathname) {
  const method = req.method;

  // GET /notes
  if ((pathname === "/notes" || pathname === "/notes/") && method === "GET") {
    return handleGetNotes(req, res);
  }

  // POST /notes
  if ((pathname === "/notes" || pathname === "/notes/") && method === "POST") {
    return handleCreateNote(req, res);
  }

  // PUT /notes/:id (ONLY if id exists)
  if (pathname.startsWith("/notes/") && method === "PUT") {
    const parts = pathname.split("/");
    const id = parseInt(parts[2]);

    if (!id) {
      res.writeHead(400);
      return res.end("Invalid ID");
    }

    return handleUpdateNote(req, res, id);
  }

  // DELETE /notes/:id
  if (pathname.startsWith("/notes/") && method === "DELETE") {
    const parts = pathname.split("/");
    const id = parseInt(parts[2]);

    if (!id) {
      res.writeHead(400);
      return res.end("Invalid ID");
    }

    return handleDeleteNote(req, res, id);
  }

  res.writeHead(404);
  res.end("Route not found");
}

module.exports = { handleNoteRoutes };
