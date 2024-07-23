const router = require("express").Router();
const { ok, error } = require("../../utils/format_results");
const { User } = require("../../models");

const createUser = async (req, res) => {
  const { name, email, isAdmin } = req.body;

  try {
    console.log(req.body);

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      throw new Error("Email address already in use");
    }

    // Create a new user
    const newUser = await User.create({ name, email, isAdmin });

    //Add PW, Auth, and JWT here

    ok(res, newUser.toJSON());
  } catch (e) {
    error(res, e, e.status);
  }
};

router.post("/", createUser);

module.exports = router;
