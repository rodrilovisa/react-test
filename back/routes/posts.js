const express = require("express");
const router = express.Router();
const postController = require("../app/api/controllers/posts");
router.get("/", postController.getPosts);
module.exports = router;
