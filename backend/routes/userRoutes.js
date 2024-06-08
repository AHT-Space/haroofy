const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route('/google').post(authController.google);
router
  .route("/register")
  .post(authController.signup)

router
  .route("/")
  .get(authController.checkUserLogin, userController.getUser)

router
  .route("/total-likes")
  .get(authController.checkUserLogin, userController.getTotalLikes)

router
  .route("/posts-me")
  .get(authController.checkUserLogin, userController.getPostsByMe)

router
  .route("/liked-posts")
  .get(authController.checkUserLogin, userController.getLikedPosts)

  module.exports = router;