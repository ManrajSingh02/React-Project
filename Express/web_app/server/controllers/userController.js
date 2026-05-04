export const getDashboard = (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user,
  });
};