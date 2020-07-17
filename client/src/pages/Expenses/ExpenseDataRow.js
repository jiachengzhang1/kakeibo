import React, { useState } from "react";

import { getDateString } from "../../utils";

const Tag = ({ type, text }) => {
  return <span className={`badge badge-pill badge-${type}`}>{text}</span>;
};

function getTag(tag) {
  switch (tag) {
    case "living":
      return <Tag type="primary" text="Expenses on Living" />;
    case "culture":
      return <Tag type="success" text="Culture and Education" />;
    case "entertainment":
      return <Tag type="warning" text="Entertainment" />;
    default:
      return <Tag type="info" text="Others" />;
  }
}

// async function handleDeleteButtonOnClick(id, updateData) {
//   await updateData({ action: "DELETE_ONE", payload: { id } });
// }

const ExpenseDataRow = ({ expense, updateData, setUpdating, setEdit }) => {
  const { _id, transactionName, amount, formated_date, tag } = expense;
  //   const [edit, setEdit] = useState(false);

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
      <td title="Tag">{getTag(tag)}</td>
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
