import React from "react";

import TableHeader from "@components/TableHeader";

import Expense from "./Expense";
import ExpenseInputRow from "./ExpenseInputRow";

const tableHeads = ["Spending", "Amount", "Date", "Tag", ""];

const ExpensesTable = ({
  expenses,
  updateData,
  createExpense,
  hideCreateExpense,
  updating,
  setUpdating,
}) => {
  const expensesTr = expenses.map((expense) => {
    return (
      <Expense
        key={expense._id}
        expense={expense}
        updateData={updateData}
        updating={updating}
        setUpdating={setUpdating}
        hideCreateExpense={hideCreateExpense}
      />
    );
  });

  return (
    <div>
      <form id="new-expense">
        <table className="expense-table">
          <TableHeader tableHeads={tableHeads} />
          <tbody>
            {createExpense ? (
              <ExpenseInputRow
                hideCreateExpense={hideCreateExpense}
                updateData={updateData}
                setUpdating={setUpdating}
              />
            ) : null}
            {expensesTr}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ExpensesTable;
