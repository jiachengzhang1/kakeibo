const express = require("express");

const router = express.Router();

router.use("/users", require("./users"));
router.use("/expenses", require("./expenses"));
router.use("/budgets", require("./budgets"));
router.use("/summaries", require("./summaries"));

module.exports = router;
