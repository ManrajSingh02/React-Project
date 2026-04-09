require("dotenv").config();

const http = require("http");
const { Cars, Bike } = require("./utils/sample.js");

const PORT = process.env.PORT || 3004;

const server = http.createServer((req, res) => {
  res.end(JSON.stringify({ Cars, Bike }));
});

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
