import React from "react";

const ExpensesTableHead = ({ heads }) => {
  const ths = heads.map((head) => {
    return <th key={head}>{head}</th>;
  });
  return <thead>{ths}</thead>;
};

export default ExpensesTableHead;
