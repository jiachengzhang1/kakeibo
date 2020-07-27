import React from "react";
import { Select } from "semantic-ui-react";

import MonthSelector from "../../components/MonthSelector";
import { EXPENSES_PER_PAGE } from "../../utils/constants";
import "./ExpenseOptions.css";

const ExpenseOptions = ({
  selectedYearMonth,
  updateYearMonth,
  yearsWithMonths,
  setExpensesPerPage,
  showCreateExpense,
}) => {
  const expensesPerPageOptions = EXPENSES_PER_PAGE.map((num) => ({
    key: num,
    text: num,
    value: num,
  }));

  return (
    <div className="expense-options">
      <div className="create-expense">
        <button className="create-expense-button" onClick={showCreateExpense}>
          <i className="plus icon"></i>New Expense
        </button>
      </div>
      <div className="filters">
        <Select
          className="expesens-per-page"
          compact
          options={expensesPerPageOptions}
          defaultValue={15}
          onChange={(event, { value }) => {
            setExpensesPerPage(value);
          }}
        />
        <MonthSelector
          selectedYearMonth={selectedYearMonth}
          updateYearMonth={updateYearMonth}
          yearsWithMonths={yearsWithMonths}
        />
      </div>
    </div>
  );
};

export default ExpenseOptions;
