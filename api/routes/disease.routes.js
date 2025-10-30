const express = require("express");
let router = express.Router();
const diseaseController = require("../controllers/disease.controller");

router
  .route("/")
  .get(diseaseController.findAll)
  .post(diseaseController.createDisease);
router
  .route("/:idU")
  .get(diseaseController.findUserDiseases)
  .post(diseaseController.addDiseaseToUser);
router.route("/:idU/:idD").get(diseaseController.findDisease);

router.all("*", function (req, res) {
  res.status(404).json({ message: "No route found" });
});

module.exports = router;
