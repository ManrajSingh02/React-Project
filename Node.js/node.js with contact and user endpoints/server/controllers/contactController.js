const { readData, writeData } = require("../utils/fileHandler");

const handleContact = (req, res) => {
  let body = "";

  req.on("data", chunk => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    console.log("BODY RECEIVED:", body); 

    try {
      const { name, email, message } = JSON.parse(body);

      if (!name || !email || !message) {
        res.writeHead(400);
        return res.end("All fields required");
      }

      const data = await readData();

      const newEntry = {
        id: Date.now(),
        name,
        email,
        message
      };

      data.push(newEntry);

      await writeData(data);

      console.log("DATA SAVED:", newEntry); 

      res.writeHead(200);
      res.end("Saved successfully");

    } catch (err) {
      console.error("ERROR:", err);
      res.writeHead(500);
      res.end("Server error");
    }
  });
};

module.exports = { handleContact };