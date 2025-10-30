const express = require("express");
let router = express.Router();
const appointmentsController = require("../controllers/appointment.controller");

router.route("/").get(appointmentsController.findAll).post(appointmentsController.createAppointment);
router.route("/:idU").get(appointmentsController.findUserAppointments);
router.route("/:idU/:idA").get(appointmentsController.findAppointment);

router.all("*", function (req, res) {
  res.status(404).json({ message: "No route found" });
});

module.exports = router;