import React, { useState, useEffect } from "react";

import { fetchYearsWithMonths } from "@api/SummaryRoute";
import PageHeader from "@components/PageHeader";
import MonthSelector from "@components/MonthSelector";

import ExpenseSummary from "./ExpenseSummary";
import BudgetVSExpense from "./BudgetVSExpense";

const Summaries = () => {
  const [selectedYearMonth, setSelectedYearMonth] = useState({});
  const [yearsWithMonths, setYearsWithMonths] = useState([]);

  const updateYearMonth = (yearMonth) => {
    setSelectedYearMonth(yearMonth);
  };

  const getYearsWithMonths = async () => {
    const data = await fetchYearsWithMonths();
    setYearsWithMonths(data);

    const { year, months } = data[0];
    if (Object.keys(selectedYearMonth).length === 0) {
      setSelectedYearMonth({ selectedYear: year, selectedMonth: months[0] });
    }
  };

  useEffect(() => {
    getYearsWithMonths();
  }, [selectedYearMonth]);

  return Object.keys(selectedYearMonth).length === 0 ? (
    <div></div>
  ) : (
    <div>
      <PageHeader option="Monthly Summaries" icon="file outline" />
      <div>
        <h4>Choose a year and month </h4>
        <MonthSelector
          selectedYearMonth={selectedYearMonth}
          updateYearMonth={updateYearMonth}
          yearsWithMonths={yearsWithMonths}
          disableAllOption
        />
      </div>
      <ExpenseSummary selectedYearMonth={selectedYearMonth} />
      <BudgetVSExpense selectedYearMonth={selectedYearMonth} />
    </div>
  );
};

export default Summaries;
