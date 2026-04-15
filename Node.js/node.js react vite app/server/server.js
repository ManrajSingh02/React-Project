require("dotenv").config();
const http = require("http");
const { Users1, Users2 } = require("./Users.js");

const PORT = process.env.PORT ?? 4000;

const server = http.createServer((req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.url === "/users" && req.method === "GET") {
    const users = [Users1, Users2]; 

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});