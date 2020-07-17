const express = require("express");

const router = express.Router();

router.use("/expenses", require("./expenses"));
router.use("/summaries", require("./summaries"));

module.exports = router;
