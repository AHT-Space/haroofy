const express = require("express");
const authController = require("./../controllers/authController");
const postController = require("./../controllers/postController");

const router = express.Router();

router.route("/")
    .get(postController.getAllPosts)
    .post(authController.checkUserLogin, postController.createPost);

router.route("/blog/:slug").get(postController.getPostBySlug);
router.route("/post/search").get(postController.getPostSearchBased);


router.route('/post/category').get(postController.getPostsByCategory);
router.route('/post/top').get(postController.getTopPosts);
router.route('/:id').get(postController.getPostById);

router.route("/like/:id").patch(authController.checkUserLogin, postController.likePost);
router.route("/unlike/:id").patch(authController.checkUserLogin, postController.unlikePost);


router.route("/:id").patch(authController.checkUserLogin, postController.updatePost)
router.route("/:id").delete(authController.checkUserLogin, postController.deletePost)



  module.exports = router;