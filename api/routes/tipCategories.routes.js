const express = require("express");
let router = express.Router();
const tipsController = require("../controllers/tipCategories.controller");

router
  .route("/")
  .get(tipsController.findAll)
  .post(tipsController.addNewTipCategory);
router.route("/:idCT").get(tipsController.findById);

router.all("*", function (req, res) {
  res.status(404).json({ message: "No route found" });
});

module.exports = router;
