import React, { useEffect, useState, useContext } from "react";

import { GroupedBarChart } from "@components/Charts/GroupedBarChart";
import { fetchBudgetVSExpenseSummary } from "@services";
import UserContext from "../../context/UserContext";

const BudgetVSExpense = ({
  selectedYearMonth: { selectedYear, selectedMonth },
}) => {
  const { userData } = useContext(UserContext);
  const { user, token } = userData;

  const authenticated = user && token;

  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchChartData = async () => {
      if (authenticated) {
        const data = await fetchBudgetVSExpenseSummary(
          selectedYear,
          selectedMonth,
          token
        );
        setChartData(data);
      }
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
