import React, { useEffect, useState } from "react";
import axios from "axios";

import { PieChart } from "@components/Charts";

import "./ExpenseSummary.css";

const ExpenseSummary = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await axios.get(
        "http://localhost:5000/summaries/expenses"
      );

      const data = {};
      response.data.spendingSummary.forEach(({ _id, totalAmount }) => {
        data[_id] = totalAmount;
      });

      setChartData(data);
    };
    fetchChartData();
  }, []);

  return (
    <div className="expense-summary">
      <h3>Expense Summary</h3>
      <PieChart data={chartData} />
    </div>
  );
};

export default ExpenseSummary;
