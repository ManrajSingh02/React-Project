const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

// ✅ ensure file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]");
}

const readData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data || "[]"));
    });
  });
};

const writeData = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

module.exports = { readData, writeData };