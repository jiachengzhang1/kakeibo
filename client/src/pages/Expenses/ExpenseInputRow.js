import React from "react";
import { useForm } from "react-hook-form";

import { Input, Select, DataPicker } from "@components/FormElements";
import { TAG_MAP } from "@utils/constants";

const tagOptions = Object.keys(TAG_MAP).map((tag) => ({
  key: tag,
  value: tag,
  text: TAG_MAP[tag].text,
}));

const ExpenseInputRow = ({
  hideEdit,
  hideCreateExpense,
  updateData,
  setUpdating,
  expense = {},
}) => {
  const {
    _id = "new",
    transactionName = "",
    amount = "",
    formated_date = null,
    tag = "living",
  } = expense;

  const { register, handleSubmit, control } = useForm();

  const expenseUnchanged = (expense) => {
    return (
      expense.transactionName === transactionName &&
      expense.amount === amount.toString() &&
      expense.tag === tag &&
      expense.formated_date === undefined
    );
  };

  const hideInputFields = () => {
    setUpdating(false);
    hideCreateExpense();
    if (hideEdit) {
      hideEdit();
    }
  };

  const onSubmitForm = async ({ id, ...rest }) => {
    if (!expenseUnchanged(rest)) {
      const action = id === "new" ? "CREATE_ONE" : "UPDATE_ONE";
      const payload = { id: id, data: rest };
      await updateData({ action: action, payload: payload });
    }

    hideInputFields();
  };

  return (
    <tr className="expense-input-row">
      <td title="Spending">
        <Input name="id" type="hidden" defaultValue={_id} register={register} />
        <Input
          name="transactionName"
          type="text"
          defaultValue={transactionName}
          register={register}
        />
      </td>
      <td title="Amount">
        <Input
          name="amount"
          type="number"
          defaultValue={amount}
          min="0"
          step="any"
          register={register}
        />
      </td>
      <td title="Date">
        <DataPicker
          name="formated_date"
          control={control}
          date={formated_date}
        />
      </td>
      <td title="Tag">
        <Select
          name="tag"
          options={tagOptions}
          register={register}
          defaultValue={tag}
        />
      </td>

      <td>
        <div className="expense-input-buttons">
          <button
            className="expense-form-save-btn"
            type="submit"
            form="new-expense"
            onClick={handleSubmit(onSubmitForm)}
          >
            Save
          </button>
          <button
            className="expense-form-cancel-btn"
            type="button"
            onClick={hideEdit ? hideEdit : hideCreateExpense}
          >
            Cancel
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ExpenseInputRow;
