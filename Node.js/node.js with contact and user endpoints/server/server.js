require("dotenv").config();

const http = require("http");
const url = require("url");

const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 4006;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  console.log("path", path);

  if (path === "/contact-us" && req.method === "POST") {
    console.log("contact working");
    return contactRoutes(req, res);
  }

  if (path === "/users" && req.method === "GET") {
    return userRoutes(req, res);
  }

  if (path === "/") {
    res.writeHead(200);
    return res.end("Server running...");
  }

  res.writeHead(404);
  res.end("Route not found");
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
