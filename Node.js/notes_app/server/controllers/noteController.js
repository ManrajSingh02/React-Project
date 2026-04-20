function handleCreateNote(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      console.log("BODY:", body); // 🔥 debug

      const parsed = JSON.parse(body);
      const { title, content } = parsed;

      if (!title || !content) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Missing fields" }));
      }

      const note = createNote(title, content);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(note));
    } catch (err) {
      console.error("JSON Error:", err);

      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid JSON" }));
    }
  });
}
