const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/data.json");

const readData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") return resolve([]);
        return reject(err);
      }

      try {
        resolve(JSON.parse(data || "[]"));
      } catch {
        resolve([]);
      }
    });
  });
};