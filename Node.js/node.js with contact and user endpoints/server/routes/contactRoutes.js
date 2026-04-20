const { handleContact } = require("../controllers/contactController");

const contactRoutes = (req, res) => {
  if (req.method === "POST") {
    return handleContact(req, res);
  }
};

module.exports = contactRoutes;