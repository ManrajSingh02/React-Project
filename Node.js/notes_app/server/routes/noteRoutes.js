const noteController = require("../controllers/noteController");

function handleNoteRoutes(req, res, pathname) {
  const method = req.method;

  const {
    handleGetNotes,
    handleCreateNote,
    handleUpdateNote,
    handleDeleteNote,
  } = noteController;


  if (!handleGetNotes) {
    console.error("handleGetNotes is undefined ");
  }

  
  if ((pathname === "/notes" || pathname === "/notes/") && method === "GET") {
    if (typeof handleGetNotes !== "function") {
      res.writeHead(500);
      return res.end("handleGetNotes is not defined properly");
    }
    return handleGetNotes(req, res);
  }

  
  if ((pathname === "/notes" || pathname === "/notes/") && method === "POST") {
    return handleCreateNote(req, res);
  }

  // UPDATE 
  if (pathname.startsWith("/notes/") && method === "PUT") {
    const parts = pathname.split("/");
    const id = parseInt(parts[2]);

    if (isNaN(id)) {
      res.writeHead(400);
      return res.end("Invalid ID");
    }

    return handleUpdateNote(req, res, id);
  }

  // DELETE note
  if (pathname.startsWith("/notes/") && method === "DELETE") {
    const parts = pathname.split("/");
    const id = parseInt(parts[2]);

    if (isNaN(id)) {
      res.writeHead(400);
      return res.end("Invalid ID");
    }

    return handleDeleteNote(req, res, id);
  }

  res.writeHead(404);
  res.end("Route not found");
}

module.exports = { handleNoteRoutes };