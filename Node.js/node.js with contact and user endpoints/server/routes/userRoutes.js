const { handleUsers } = require("../controllers/userController");

const userRoutes = (req, res) => {
  if (req.method === "GET") {
    return handleUsers(req, res);
  }
};

module.exports = userRoutes;