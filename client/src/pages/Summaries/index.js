import React from "react";
import PageHeader from "components/PageHeader";
import ExpenseSummary from "./ExpenseSummary";
import BudgetVSExpense from "./BudgetVSExpense";

const Summaries = () => {
  return (
    <div>
      <PageHeader option="Monthly Summaries" icon="file outline" />
      <ExpenseSummary />
      <BudgetVSExpense />
    </div>
  );
};

export default Summaries;
