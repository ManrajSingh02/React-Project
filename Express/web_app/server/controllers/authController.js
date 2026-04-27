const jwt = require("jsonwebtoken");

const users = [];


const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, name: user.name },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "1h" }
  );
};


const registerUser = (req, res) => {
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

  res.status(201).json({ message: "Registered successfully" });
};


const loginUser = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.json({
    message: "Login successful",
    token,
  });
};


const getDashboard = (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getDashboard,
};