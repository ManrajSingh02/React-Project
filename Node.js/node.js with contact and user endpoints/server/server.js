const http = require("http");
const url = require("url");

const { handleContact } = require("./routes/contact");
const { handleUsers } = require("./routes/users");

const PORT = process.env.PORT ?? 4002;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  if (path === "/contact-us" && req.method === "POST") {
    return handleContact(req, res);
  }

  if (path === "/users" && req.method === "GET") {
    return handleUsers(req, res);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Your mssg not found" }));
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
