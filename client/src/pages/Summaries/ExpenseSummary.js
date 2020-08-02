import React, { useEffect, useState, useContext } from "react";

import { fetchExpenseSummary } from "@services";
import { PieChart } from "@components/Charts";

import "./ExpenseSummary.css";
import UserContext from "../../context/UserContext";

const ExpenseSummary = ({
  selectedYearMonth: { selectedYear, selectedMonth },
}) => {
  const { userData } = useContext(UserContext);
  const { user, token } = userData;

  const authenticated = user && token;

  const [chartData, setChartData] = useState({});
  useEffect(() => {
    const fetchChartData = async () => {
      if (authenticated) {
        const data = await fetchExpenseSummary(
          selectedYear,
          selectedMonth,
          token
        );

        setChartData(data);
      }
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
