import React, { useState } from "react";
import PageHeader from "components/PageHeader";
import ExpenseSummary from "./ExpenseSummary";
import BudgetVSExpense from "./BudgetVSExpense";

const Summaries = () => {
  // TODO: select current month
  const currentDate = new Date();
  const [selectedYearMonth, setSelectedYearMonth] = useState({
    selectedYear: currentDate.getUTCFullYear(),
    selectedMonth: currentDate.getUTCMonth() + 1,
  });

  return (
    <div>
      <PageHeader option="Monthly Summaries" icon="file outline" />
      <ExpenseSummary selectedYearMonth={selectedYearMonth} />
      <BudgetVSExpense selectedYearMonth={selectedYearMonth} />
    </div>
  );
};

export default Summaries;
