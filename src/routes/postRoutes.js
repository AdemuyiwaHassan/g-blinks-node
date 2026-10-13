const express = require("express");
const {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("./../controllers/postController");

const router = express.Router();

router.param("id", (req, res, next, val) => {
  console.log(`Post id is: ${val}`);
  next();
});

router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);

module.exports = router;
