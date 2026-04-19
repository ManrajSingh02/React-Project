const { readData, writeData } = require("../utils/fileHandler");

const handleContact = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      if (!body) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Empty request body" }));
      }

      const { name, email, message } = JSON.parse(body);

      if (!name || !email || !message) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "All fields are required" }));
      }

      const newEntry = {
        id: Date.now(),
        name,
        email,
        message,
      };

      const data = await readData();
      data.push(newEntry);

      await writeData(data);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Data saved successfully" }));
    } catch (error) {
      console.error("ERROR:", error);

      res.writeHead(500, { "Content-Type": "application/json" });

      res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
  });
};

module.exports = { handleContact };
