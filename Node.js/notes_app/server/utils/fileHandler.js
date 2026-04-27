const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/notes.json");

function readData() {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]");
    }

    const data = fs.readFileSync(filePath, "utf-8");

    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Read Error:", err);
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };