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

  //   const handleDelete = (event) => {
  //     event.stopPropagation();
  //     handleDeleteButtonOnClick(_id, updateData);
  //   };

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
    // <ExpenseForm
    //   hideCreateExpense={hideCreateExpense}
    //   expense={expense}
    //   hideEdit={() => {
    //     setEdit(false);
    //     setUpdating(false);
    //   }}
    //   register={register}
    //   control={control}
    // />
    // <tr
    //   onClick={() => {
    //     setEdit(true);
    //     setUpdating(true);
    //   }}
    // >
    //   <td title="Spending">{transactionName}</td>
    //   <td title="Amount">${amount}</td>
    //   <td title="Date">{getDateString(formated_date)}</td>
    //   <td title="Tag">{getTag(tag)}</td>
    //   <td>
    //     <div className="expense-delete-btn" onClick={handleDelete}>
    //       <div className="expense-delete-btn-delete">Delete</div>
    //       <div className="expense-delete-btn-left"></div>
    //       <div className="expense-delete-btn-right"></div>
    //     </div>
    //   </td>
    // </tr>
  );
};

export default Expense;
