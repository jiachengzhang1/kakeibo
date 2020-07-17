import React from "react";

import { Input, Select, DataPicker } from "../../components/FormElements";

const tagOptions = [
  { key: "living", value: "living", text: "Expenses on Living" },
  { key: "culture", value: "culture", text: "Culture and Education" },
  { key: "entertainment", value: "entertainment", text: "Entertainment" },
  { key: "others", value: "others", text: "Others" },
];

const ExpenseInputRow = ({
  hideEdit,
  hideCreateExpense,
  expense = {},
  register,
  control,
}) => {
  const {
    _id = "new",
    transactionName = "",
    amount = "",
    formated_date = null,
    tag = "living",
  } = expense;

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
