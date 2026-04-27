require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4008;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);


app.use(express.json());

const users = [];

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const newUser = { name, email, password };
  users.push(newUser);

 
  const token = jwt.sign(
    { name, email },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "2h" }
  );

  res.status(201).json({
    message: "Registered successfully",
    token,
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { name: user.name, email: user.email },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token,
  });
});
app.get("/dashboard", (req, res) => {
  const authHeader = req.headers.authorization;

 
  if (!authHeader) {
    return res.json({
      message: " Access denied. Please login first.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    res.json({
      message: " Welcome to dashboard!",
      user,
    });
  } catch {
    res.json({
      message: " Invalid or expired token",
    });
  }
});


app.get("/", (req, res) => {
  res.send(" Server is running...");
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});