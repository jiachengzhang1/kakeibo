const express = require("express");
const Expense = require("../models/Expense");
const Budget = require("../models/Budget");

const getYearsWithMonths = require("./sharedFunctions/getYearsWithMonths");

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
      $match: { username: req.user },
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

    const response = await Expense.aggregate(pipline);

    const data = response.map(({ totalAmount, _id, count }) => {
      return { _id, count, totalAmount: parseFloat(totalAmount).toFixed(1) };
    });

    res.status(200).send({
      year: year,
      month: month,
      spendingSummary: data,
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

    const match = {
      $match: { username: req.user },
    };

    const { year, month } = req.params;

    if (year) {
      match.$match.year = parseInt(year);
    }
    if (month) {
      match.$match.month = parseInt(month);
    }

    budgetPipline.unshift(match);
    expensePipline.unshift(match);

    const expenseResponse = await Expense.aggregate(expensePipline);

    // console.log(expenseResponse);

    const budgetResponse = await Budget.aggregate(budgetPipline);
    // console.log(budgetResponse);

    const response = [];

    expenseResponse.sort((a, b) => (a._id > b._id ? 1 : -1));
    budgetResponse.sort((a, b) => (a._id > b._id ? 1 : -1));

    const expenseLength = expenseResponse.length,
      budgetLength = budgetResponse.length;
    let i = 0,
      j = 0;
    while (i < expenseLength && j < budgetLength) {
      const { _id: expenseId, expense } = expenseResponse[i];
      const { _id: budgetId, budget } = budgetResponse[j];

      if (expenseId === budgetId) {
        response.push({ tag: expenseId, expense, budget });
      } else if (expenseId < budgetId) {
        response.push({ tag: expenseId, expense, budget: 0 });
      } else {
        response.push({ tag: budgetId, expense: 0, budget });
      }
      i++;
      j++;
    }

    while (i < expenseLength) {
      response.push({
        tag: expenseResponse[i]._id,
        expense: expenseResponse[i].expense,
        budget: 0,
      });
      i++;
    }
    while (j < budgetLength) {
      response.push({
        tag: budgetResponse[j]._id,
        expense: 0,
        budget: budgetResponse[j].budget,
      });
      j++;
    }

    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

router.get("/months", async (req, res) => {
  try {
    const yearsWithMonths = await getYearMonth(req.user);
    res.status(200).send(yearsWithMonths);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

async function getYearMonth(username) {
  try {
    const expenseUniqueYears = await Expense.find({ username }).distinct(
      "year"
    );
    const budgetUniqueYears = await Budget.find({ username }).distinct("year");

    const uniqueYearsSet = new Set([
      ...expenseUniqueYears,
      ...budgetUniqueYears,
    ]);
    const uniqueYears = [...uniqueYearsSet];

    const expensesYearsWithMonths = await getYearsWithMonths(
      uniqueYears,
      Expense,
      username
    );
    const budgetsYearsWithMonths = await getYearsWithMonths(
      uniqueYears,
      Budget,
      username
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
