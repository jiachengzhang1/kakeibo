const express = require("express");
const Expense = require("../models/Expense");
const Budget = require("../models/Budget");

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
    // console.log(response);
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

router.get("/budgets/:year?/:month?", async (req, res) => {
  try {
    const expensePipline = [
      {
        $group: {
          _id: "$tag",
          expense: { $sum: "$amount" },
        },
      },
      // {
      //   $sort: { _id: 1 },
      // },
    ];

    const budgetPipline = [
      {
        $group: {
          _id: "$tag",
          budget: { $sum: "$amount" },
        },
      },
    ];

    // console.log(pipline);

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
      budgetPipline.unshift(match);
      expensePipline.unshift(match);
    }

    const expenseResponse = await Expense.aggregate(expensePipline);

    // console.log(expenseResponse);

    const budgetResponse = await Budget.aggregate(budgetPipline);

    const response = [];
    const length = Math.max(expenseResponse.length, budgetResponse.length);
    for (let i = 0; i < length; i++) {
      const budgetExpense = {
        ...expenseResponse[i],
        ...budgetResponse.find((item) => item._id === expenseResponse[i]._id),
      };
      const { _id, expense = 0, budget = 0 } = budgetExpense;

      response.push({ tag: _id, expense, budget });
    }

    console.log(response);

    // expenseResponse.map(({ _id, totalAmount }, i) => {
    //   const budget = budgetResponse[i];
    //   if (budget._id !== _id) {
    //     throw new Error("Expense and budget don't match.");
    //   }

    //   const budgetExpense = {
    //     tag: _id,
    //     budget: budget.totalAmount,
    //     expense: totalAmount,
    //   };

    //   response.push(budgetExpense);
    // });
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

module.exports = router;
