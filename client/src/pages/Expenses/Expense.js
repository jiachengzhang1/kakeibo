import React, { useState } from "react";

import ExpenseInputRow from "./ExpenseInputRow";
import ExpenseDataRow from "./ExpenseDataRow";

const Expense = ({
  expense,
  updateData,
  updating,
  setUpdating,
  hideCreateExpense,
  register,
  control,
}) => {
  //   const { _id, transactionName, amount, formated_date, tag } = expense;
  const [edit, setEdit] = useState(false);

  return edit && updating ? (
    <ExpenseInputRow
      hideEdit={() => {
        setEdit(false);
        setUpdating(false);
      }}
      hideCreateExpense={hideCreateExpense}
      expense={expense}
      register={register}
      control={control}
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
