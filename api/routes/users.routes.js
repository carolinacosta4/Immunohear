const express = require("express");
let router = express.Router();
const usersController = require("../controllers/users.controller");
const authController = require("../controllers/auth.controller");

const multer = require('multer')
let storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('profilePicture');

router.route("/").get(usersController.findAll).post(usersController.register);
router.route("/login").post(usersController.login);
router
  .route("/:idU")
  .get(usersController.findUser)
  .patch(
    authController.verifyToken, 
    usersController.edit);
router
  .route("/:idU/change-profile-picture")
  .patch(
    authController.verifyToken,
    multerUploads,
    usersController.changeProfilePicture
  );

// router.route("/reset-password/:idU").post(usersController.resetPassword);
// router.route("/password-recovery").post(usersController.recoverEmail);
//   .delete(authController.verifyToken, usersController.delete);

router.all("*", function (req, res) {
  res.status(404).json({ message: "users: what???" });
});

module.exports = router;
