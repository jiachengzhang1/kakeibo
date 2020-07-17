const express = require("express");
const Expense = require("../models/Expense");

const router = express.Router();

router.get("/expenses/:year?/:month?", async (req, res) => {
  try {
    const pipline = [
      {
        $group: {
          _id: "$tag",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { totalAmount: -1 },
      },
    ];
    const match = {
      $match: {},
    };
    const { year, month } = req.params;
    if (year) {
      match.$match.year = parseInt(year);
    }
    if (month) {
      match.$match.month = parseInt(month);
    }
    if (Object.keys(match.$match).length !== 0) {
      pipline.unshift(match);
    }
    // console.log(pipline);
    const response = await Expense.aggregate(pipline);
    console.log(response);
    const data = response.map(({ totalAmount, _id, count }) => {
      return { _id, count, totalAmount: parseFloat(totalAmount).toFixed(1) };
    });
    console.log(data);
    res.status(200).send({
      year: year,
      month: month,
      spendingSummary: response,
    });
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

module.exports = router;
