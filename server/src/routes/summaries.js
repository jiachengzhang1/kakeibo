const express = require("express");
const Expense = require("../models/Expense");
const Budget = require("../models/Budget");

const getYearsWithMonths = require("./sharedFunctions/getYearsWithMonths");
const { response } = require("express");

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
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

router.get("/months", async (req, res) => {
  try {
    const yearsWithMonths = await getYearMonth();
    res.status(200).send(yearsWithMonths);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

async function getYearMonth() {
  try {
    const expenseUniqueYears = await Expense.find().distinct("year");
    const budgetUniqueYears = await Budget.find().distinct("year");

    const uniqueYearsSet = new Set([
      ...expenseUniqueYears,
      ...budgetUniqueYears,
    ]);
    const uniqueYears = [...uniqueYearsSet];

    const expensesYearsWithMonths = await getYearsWithMonths(
      uniqueYears,
      Expense
    );
    const budgetsYearsWithMonths = await getYearsWithMonths(
      uniqueYears,
      Budget
    );

    return mergeYearsMonths(expensesYearsWithMonths, budgetsYearsWithMonths);
  } catch (error) {
    throw new Error(error);
  }
}

function mergeYearsMonths(arr1, arr2) {
  let i = 0,
    j = 0;
  const res = [],
    length1 = arr1.length,
    length2 = arr2.length;
  while (i < length1 && j < length2) {
    const { year: year1, months: months1 } = arr1[i];
    const { year: year2, months: months2 } = arr2[j];

    if (year1 === year2) {
      const mergedMonths = [...new Set([...months1, ...months2])].sort(
        (a, b) => b - a
      );

      res.push({ year: year1, months: mergedMonths });
      i++;
      j++;
    } else if (year1 < year2) {
      res.push(arr1[i++]);
    } else {
      res.push(arr2[j++]);
    }
  }

  while (i < length1) {
    res.push(arr1[i++]);
  }
  while (j < length2) {
    res.push(arr2[j++]);
  }

  return res;
}

module.exports = router;
