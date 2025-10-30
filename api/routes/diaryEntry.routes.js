const express = require("express");
let router = express.Router();
const diaryController = require("../controllers/diaryEntry.controller");
const authController = require("../controllers/auth.controller");

router
  .route("/")
  .get(diaryController.findAll)
  .post(authController.verifyToken, diaryController.createDiary);
router.route("/:idU").get(diaryController.findUserEntries);
router.route("/:idU/:idE").get(diaryController.findEntry);

router.all("*", function (req, res) {
  res.status(404).json({ message: "No route found" });
});

module.exports = router;
