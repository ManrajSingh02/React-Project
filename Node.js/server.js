require("dotenv").config();

const http = require("http");
const { cars, Bike } = require("./utils/sample.js");

const PORT = process.env.PORT || 3002;

const server = http.createServer((req, res) => {
  res.end(JSON.stringify({ cars, Bike }));
});

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
