import React from "react";
import { useForm } from "react-hook-form";

import Expense from "./Expense";
import TableHeader from "../../components/TableHeader";
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
  const { register, handleSubmit, control, errors } = useForm();

  const expensesTr = expenses.map((expense) => {
    return (
      <Expense
        key={expense._id}
        expense={expense}
        updateData={updateData}
        updating={updating}
        setUpdating={setUpdating}
        hideCreateExpense={hideCreateExpense}
        register={register}
        control={control}
      />
    );
  });

  const onSubmitForm = async ({ id, ...rest }) => {
    const action = id === "new" ? "CREATE_ONE" : "UPDATE_ONE";
    const payload = { id: id, data: rest };
    await updateData({ action: action, payload: payload });
    setUpdating(false);
    hideCreateExpense();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitForm)} id="new-expense">
        <table className="expense-table">
          <TableHeader tableHeads={tableHeads} />
          <tbody>
            {createExpense ? (
              <ExpenseInputRow
                hideCreateExpense={hideCreateExpense}
                register={register}
                control={control}
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
