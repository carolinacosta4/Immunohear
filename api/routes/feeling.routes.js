const express = require("express");
let router = express.Router();
const feelingsController = require("../controllers/feeling.controller");

router
  .route("/")
  .get(feelingsController.findAll)
  .post(feelingsController.createFeeling);

router.all("*", function (req, res) {
  res.status(404).json({ message: "No route found" });
});

module.exports = router;
