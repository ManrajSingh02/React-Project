const http = require("http");
const { handleNotes } = require("./routes/notes");

const PORT = process.env.PORT ?? 4003;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  if (req.url.startsWith("/notes")) {
    return handleNotes(req, res);
  }

  res.writeHead(200);
  res.end("Server Running ");
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
