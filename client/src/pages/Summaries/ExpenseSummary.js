import React, { useEffect, useState } from "react";

import { fetchExpenseSummary } from "@api";
import { PieChart } from "@components/Charts";

import "./ExpenseSummary.css";

const ExpenseSummary = ({
  selectedYearMonth: { selectedYear, selectedMonth },
}) => {
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    const fetchChartData = async () => {
      const data = await fetchExpenseSummary(selectedYear, selectedMonth);

      setChartData(data);
    };
    fetchChartData();
  }, [selectedMonth, selectedYear]);

  return (
    <div className="expense-summary">
      <h3>Expense Summary</h3>
      <PieChart data={chartData} />
    </div>
  );
};

export default ExpenseSummary;
