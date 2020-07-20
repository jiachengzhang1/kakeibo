import React from "react";
import BudgetCard from "./BudgetCard";

const CreateBudget = ({
  availableTags,
  handleBudgetCreate,
  handleBudgetDelete,
}) => {
  return (
    <BudgetCard
      availableTags={availableTags}
      handleBudgetCreate={handleBudgetCreate}
      handleBudgetDelete={handleBudgetDelete}
      creatingMode
    />
  );
};

export default CreateBudget;
