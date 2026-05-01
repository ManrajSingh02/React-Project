import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const users = [];

const createToken = (user) =>
  jwt.sign(
    { name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { name, email, password: hashedPassword };
  users.push(newUser);

  const token = createToken(newUser);

  res.status(201).json({
    message: "Registered successfully",
    token,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = createToken(user);

  res.json({
    message: "Login successful",
    token,
  });
};

export const getDashboard = (req, res) => {
  res.json({
    message: "Welcome to dashboard!",
    user: req.user,
  });
};
