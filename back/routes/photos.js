const express = require("express");
const router = express.Router();
const photosController = require("../app/api/controllers/photos");
router.get("/", photosController.getPhotos);
module.exports = router;
