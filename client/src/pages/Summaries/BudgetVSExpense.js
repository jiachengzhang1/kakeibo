import React, { useEffect, useState } from "react";

import { GroupedBarChart } from "@components/Charts/GroupedBarChart";
import { fetchBudgetVSExpenseSummary } from "@services";

const BudgetVSExpense = ({
  selectedYearMonth: { selectedYear, selectedMonth },
}) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchChartData = async () => {
      const data = await fetchBudgetVSExpenseSummary(
        selectedYear,
        selectedMonth
      );
      setChartData(data);
    };
    fetchChartData();
  }, [selectedYear, selectedMonth]);

  return (
    <div className="budget-vs-expense">
      <h3>Budget VS Expense</h3>
      <GroupedBarChart data={chartData} />
    </div>
  );
};

export default BudgetVSExpense;
