const express = require("express");
const authController = require("./../controllers/authController");
const commentController = require("./../controllers/commentController");

const router = express.Router();

router.route("/")
    .post(authController.checkUserLogin, commentController.createComment);

router.route("/:postId").get(commentController.getCommentsForPost);

router.route("/:commentId")
    .patch(authController.checkUserLogin, commentController.updateComment)
    .delete(authController.checkUserLogin, commentController.deleteComment);

  module.exports = router;