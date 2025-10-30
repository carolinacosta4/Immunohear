const express = require("express");
let router = express.Router();
const examsController = require("../controllers/exam.controller");

router.route("/").get(examsController.findAll).post(examsController.createExam);
router.route("/:idU").get(examsController.findUserExams).post(examsController.addExamToUser);
router.route("/:idU/:idE").get(examsController.findExam);

router.all("*", function (req, res) {
  res.status(404).json({ message: "No route found" });
});

module.exports = router;