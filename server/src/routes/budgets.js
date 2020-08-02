const express = require("express");
const Budget = require("../models/Budget");

const router = express.Router();

router.get("/:year?/:month?", async (req, res) => {
  try {
    const { year, month } = req.params;

    const filter = { username: req.user };

    if (year !== undefined) {
      filter.year = year;
    }

    if (month !== undefined) {
      filter.month = month;
    }

    const budget = await Budget.find(filter).sort({ date_created: -1 });

    // console.log(tmp);
    res.status(200).send(budget);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    data.username = req.user;
    console.log(data);
    const budget = new Budget(data);
    const response = await budget.save();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

router.put("/:budgetId", async (req, res) => {
  try {
    const budgetId = req.params.budgetId;
    const data = req.body;
    const response = await Budget.findByIdAndUpdate({ _id: budgetId }, data);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

router.delete("/:budgetId", async (req, res) => {
  try {
    const budgetId = req.params.budgetId;
    const response = await Budget.findByIdAndDelete(budgetId);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

module.exports = router;
