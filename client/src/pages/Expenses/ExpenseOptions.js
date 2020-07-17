import React from "react";
import { Select } from "semantic-ui-react";
import "./ExpenseOptions.css";

import MonthSelector from "../../components/MonthSelector";

const ExpenseOptions = ({
  selectedYearState,
  selectedMonthState,
  yearsWithMonths,
  setExpensesPerPage,
  setSelectedYearState,
  setSelectedMonthState,
  showCreateExpense,
}) => {
  const expensesPerPage = [
    { key: "15", text: "15", value: 15 },
    { key: "30", text: "30", value: 30 },
    { key: "60", text: "60", value: 60 },
  ];
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
          options={expensesPerPage}
          defaultValue={15}
          onChange={(event, { value }) => {
            setExpensesPerPage(value);
          }}
        />
        <MonthSelector
          selectedYearState={selectedYearState}
          selectedMonthState={selectedMonthState}
          yearsWithMonths={yearsWithMonths}
          setSelectedYearState={setSelectedYearState}
          setSelectedMonthState={setSelectedMonthState}
        />
      </div>
    </div>
  );
};

export default ExpenseOptions;
