const express = require("express");
const router = express.Router();
const detailController = require("../app/api/controllers/detail");
router.get("/", detailController.getDetail);
module.exports = router;
