const router = require("express").Router();
const { ok, error } = require("../../utils/format_results");
const { Event, User } = require("../../models");

const createEvent = async (req, res) => {
  const { name, email, date, maxCapacity } = req.body;

  try {
    console.log(req.body);

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      throw new Error("No account with given email.");
    }

    if (!existingUser?.isAdmin) {
      throw new Error(
        "Account doesn't have admin privileges. Please use an admin account."
      );
    }

    // Create a new Event
    const event = await Event.create({ name, date, maxCapacity });

    //Return event to user
    ok(res, event.toJSON());
  } catch (e) {
    error(res, e, e.status);
  }
};

router.post("/", createEvent);

module.exports = router;
