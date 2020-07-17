import React from "react";

const TableHeader = ({ tableHeads }) => {
  const ths = tableHeads.map((tableHead) => (
    <th key={tableHead}>{tableHead}</th>
  ));
  return (
    <thead>
      <tr>{ths}</tr>
    </thead>
  );
};

export default TableHeader;
