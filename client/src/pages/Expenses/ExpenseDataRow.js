import React from "react";

import { getDateString } from "../../utils";
import Tag from "../../components/Tag";


const ExpenseDataRow = ({ expense, updateData, setUpdating, setEdit }) => {
  const { _id, transactionName, amount, formated_date, tag } = expense;

  const handleDelete = async (event) => {
    event.stopPropagation();
    await updateData({ action: "DELETE_ONE", payload: { id: _id } });
  };

  return (
    <tr
      onClick={() => {
        setEdit(true);
        setUpdating(true);
      }}
    >
      <td title="Spending">{transactionName}</td>
      <td title="Amount">${amount}</td>
      <td title="Date">{getDateString(formated_date)}</td>
      <td title="Tag">
        <Tag tag={tag} />
      </td>
      <td>
        <div className="expense-delete-btn" onClick={handleDelete}>
          <div className="expense-delete-btn-delete">Delete</div>
          <div className="expense-delete-btn-left"></div>
          <div className="expense-delete-btn-right"></div>
        </div>
      </td>
    </tr>
  );
};

export default ExpenseDataRow;
