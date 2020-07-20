import React, { useEffect, useState } from "react";
import axios from "axios";
import { GroupedBarChart } from "../../components/Charts/GroupedBarChart";

const BudgetVSExpense = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await axios.get(
        "http://localhost:5000/summaries/budgets"
      );

      //   const data = {};
      //   console.log(response.data);
      //   response.data.forEach(({ _id, totalAmount }) => {
      //     data[_id] = totalAmount;
      //   });

      setChartData(response.data);
    };
    fetchChartData();
  }, []);

  //   console.log(chartData);
  return (
    <div className="budget-vs-expense">
      <h3>Budget VS Expense</h3>
      <GroupedBarChart data={chartData} />
    </div>
  );
};

export default BudgetVSExpense;
