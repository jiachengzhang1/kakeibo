import React from "react";
import BudgetCard from "./BudgetCard";

const BudgetCards = ({
  budgets,
  handleBudgetCreate,
  handleBudgetUpdate,
  handleBudgetDelete,
}) => {
  return budgets.map((budget) => (
    <BudgetCard
      key={budget._id}
      budget={budget}
      handleBudgetCreate={handleBudgetCreate}
      handleBudgetUpdate={handleBudgetUpdate}
      handleBudgetDelete={handleBudgetDelete}
    />
  ));
};

export default BudgetCards;
