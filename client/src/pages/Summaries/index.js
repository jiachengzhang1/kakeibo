import React, { useState, useEffect, useContext } from "react";

import { fetchYearsWithMonths } from "@services/SummaryRoute";
import PageHeader from "@components/PageHeader";
import MonthSelector from "@components/MonthSelector";

import ExpenseSummary from "./ExpenseSummary";
import BudgetVSExpense from "./BudgetVSExpense";
import UserContext from "../../context/UserContext";

const Summaries = () => {
  const [selectedYearMonth, setSelectedYearMonth] = useState({});
  const [yearsWithMonths, setYearsWithMonths] = useState([]);

  const { userData } = useContext(UserContext);
  const { user, token } = userData;

  const authenticated = user && token;

  const updateYearMonth = (yearMonth) => {
    setSelectedYearMonth(yearMonth);
  };

  const getYearsWithMonths = async () => {
    if (authenticated) {
      const data = await fetchYearsWithMonths(token);
      setYearsWithMonths(data);

      const { year, months } = data[0];
      if (Object.keys(selectedYearMonth).length === 0) {
        setSelectedYearMonth({ selectedYear: year, selectedMonth: months[0] });
      }
    }
  };

  useEffect(() => {
    getYearsWithMonths();
  }, [selectedYearMonth]);

  return (
    <div>
      <PageHeader option="Monthly Summaries" icon="file outline" />
      {Object.keys(selectedYearMonth).length !== 0 ? (
        <div>
          <h4>Choose a year and month </h4>
          <MonthSelector
            selectedYearMonth={selectedYearMonth}
            updateYearMonth={updateYearMonth}
            yearsWithMonths={yearsWithMonths}
            disableAllOption
          />
          <ExpenseSummary selectedYearMonth={selectedYearMonth} />
          <BudgetVSExpense selectedYearMonth={selectedYearMonth} />
        </div>
      ) : null}
    </div>
  );
};

export default Summaries;
