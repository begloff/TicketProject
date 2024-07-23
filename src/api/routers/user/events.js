const router = require("express").Router();
const { ok, error } = require("../../utils/format_results");
const { Event, User, Booking } = require("../../models");

const getEvents = async (req, res) => {
  try {
    //Fetch all events with their bookings as well
    const events = await Event.scope("bookings").findAll();

    ok(res, events);
  } catch (e) {
    error(res, e, e.status);
  }
};

const createBooking = async (req, res) => {
  const { id } = req.params;
  const { email, ticketCount } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return error(res, new Error("No user exists with given email."), 404);
    }

    const event = await Event.findByPk(id);
    if (!event) {
      return error(res, "No such event exists.", 404);
    }

    // Check availability
    if (event.maxCapacity < ticketCount) {
      return error(res, "Not enough tickets available", 400);
    }

    // Create the booking
    const booking = await Booking.create({
      userId: user?.id,
      eventId: event?.id,
      ticketCount,
    });

    // Success response
    ok(res, booking);
  } catch (e) {
    error(res, e, e.status);
  }
};
router.get("/", getEvents);
router.post("/:id", createBooking);

module.exports = router;
