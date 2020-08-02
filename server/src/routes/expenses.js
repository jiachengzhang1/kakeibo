const express = require("express");
const Expense = require("../models/Expense");
const getYearsWithMonths = require("./sharedFunctions/getYearsWithMonths");

const router = express.Router();
const defaultQuery = {},
  defaultOption = {};

router.post("/", async (req, res) => {
  const {
    action = "GET_EXPENSES",
    payload,
    query = defaultQuery,
    options = defaultOption,
  } = req.body;
  let response = null,
    status = 200;
  try {
    const queryOfUser = { ...query, ...{ username: req.user } };
    switch (action) {
      // get expenses
      case "GET_EXPENSES":
        response = await getExpenses(queryOfUser, options);
        break;

      // get expenses and unique years with unique months of all expenses
      case "GET_EXPENSES_WITH_YEARS_AND_MONTHS":
        response = await getExpensesWithYearsAndMonths(
          queryOfUser,
          options,
          req.user
        );
        break;

      // create an expense
      case "CREATE_ONE":
        if (!payload.data) {
          throw new Error("Something is wrong!");
        }
        payload.data.username = req.user;
        const createStatus = await createExpense(payload.data);
        if (createStatus === 200) {
          response = await getExpensesWithYearsAndMonths(
            queryOfUser,
            options,
            req.user
          );
        }
        status = createStatus;
        break;

      // update an expense
      case "UPDATE_ONE":
        if (!payload.id || !payload.data) {
          throw new Error("Something is wrong!");
        }
        const updateStatus = await updateExpense(payload.id, payload.data);
        if (updateStatus === 200) {
          response = await getExpensesWithYearsAndMonths(
            queryOfUser,
            options,
            req.user
          );
        }
        status = updateStatus;
        break;

      // delete an expense
      case "DELETE_ONE":
        if (!payload.id) {
          throw new Error("Something is wrong!");
        }

        const deleteStatus = await deleteExpense(payload.id);
        if (deleteStatus === 200) {
          response = await getExpensesWithYearsAndMonths(
            queryOfUser,
            options,
            req.user
          );
          // console.log(response);
        } else if (deleteStatus === 204) {
          response = "No change is made!";
        }
        status = deleteStatus;
        break;

      // error if action is invalid
      default:
        throw new Error("Something is wrong!");
    }
    res.status(status).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// helper functions for the requests
async function getExpenses(query, options) {
  try {
    const response = await Expense.paginate(query, options);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

async function getExpensesWithYearsAndMonths(query, options, user) {
  const expenses = await getExpenses(query, options);
  const uniqueYears = await Expense.find({ username: user }).distinct("year");
  const yearsWithMonths = await getYearsWithMonths(uniqueYears, Expense, user);
  return { yearsWithMonths, expenses };
}

async function createExpense(data) {
  try {
    console.log(data);
    const formated_date = new Date(data.formated_date);
    const year = formated_date.getUTCFullYear(),
      month = formated_date.getUTCMonth() + 1,
      date = formated_date.getUTCDate(),
      day = formated_date.getUTCDay();

    const expense = new Expense({
      year,
      month,
      date,
      day,

      ...data,
    });

    let status = 200;
    const response = await expense.save();
    if (!response) {
      status = 400;
    }
    return status;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateExpense(id, data) {
  try {
    let status = 200;
    let response = null;
    if (data.formated_date) {
      const formated_date = new Date(data.formated_date);
      const year = formated_date.getUTCFullYear(),
        month = formated_date.getUTCMonth() + 1,
        date = formated_date.getUTCDate(),
        day = formated_date.getUTCDay();
      response = await Expense.findOneAndUpdate(
        { _id: id },
        {
          year,
          month,
          date,
          day,
          ...data,
        }
      );
    } else {
      response = await Expense.findOneAndUpdate({ _id: id }, data);
    }
    if (!response) {
      status = 400;
    }
    return status;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteExpense(id) {
  try {
    let status = 200;
    const response = await Expense.deleteOne({ _id: id });
    if (!response) {
      status = 400;
    } else if (response.deletedCount === 0) {
      status = 204;
    }
    return status;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = router;
