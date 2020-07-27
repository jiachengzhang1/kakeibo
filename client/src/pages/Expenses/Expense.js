import React, { useState } from "react";

import ExpenseInputRow from "./ExpenseInputRow";
import ExpenseDataRow from "./ExpenseDataRow";

const Expense = ({
  expense,
  updateData,
  updating,
  setUpdating,
  hideCreateExpense,
}) => {
  const [edit, setEdit] = useState(false);

  return edit && updating ? (
    <ExpenseInputRow
      hideEdit={() => {
        setEdit(false);
        setUpdating(false);
      }}
      hideCreateExpense={hideCreateExpense}
      setUpdating={setUpdating}
      updateData={updateData}
      expense={expense}
    />
  ) : (
    <ExpenseDataRow
      expense={expense}
      updateData={updateData}
      setUpdating={setUpdating}
      setEdit={setEdit}
    />
  );
};

export default Expense;
