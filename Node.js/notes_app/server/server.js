require("dotenv").config();

const http = require("http");
const { handleNoteRoutes } = require("./routes/noteRoutes");

const PORT = process.env.PORT || 4008;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  if (pathname.startsWith("/notes")) {
    return handleNoteRoutes(req, res, pathname);
  }

  res.writeHead(200);
  res.end("Server Running");
});

server.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
