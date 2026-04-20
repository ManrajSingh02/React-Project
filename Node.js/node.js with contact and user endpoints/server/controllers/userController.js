const { readData } = require("../utils/fileHandler");

const handleUsers = async (req, res) => {
  try {
    const data = await readData();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error fetching users" }));
  }
};

module.exports = { handleUsers };