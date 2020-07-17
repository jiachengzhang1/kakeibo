import React from "react";
import { Select } from "semantic-ui-react";

import "./styles.css";

const MonthSelector = ({
  selectedYearState,
  selectedMonthState,
  yearsWithMonths,
  setSelectedYearState,
  setSelectedMonthState,
}) => {
  const years = [
    { key: 0, text: "All Years", value: 0 },
    ...yearsWithMonths.map(({ year }) => ({
      key: year,
      text: year,
      value: year,
    })),
  ];

  const monthMap = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  let monthOptions = [
    {
      key: 0,
      text: "All months",
      value: 0,
    },
  ];

  yearsWithMonths.forEach(({ year, months }) => {
    if (year === selectedYearState) {
      months.forEach((month) => {
        monthOptions.push({
          key: month,
          text: monthMap[month],
          value: month,
        });
      });
    }
  });

  return (
    <div className="month-selector">
      <Select
        className="input-select year"
        compact
        options={years}
        // placeholder="Year"
        onChange={(event, { value }) => {
          setSelectedMonthState(0);
          setSelectedYearState(value);
        }}
        value={selectedYearState}
      />
      <Select
        className="input-select month"
        compact
        disabled={selectedYearState === 0}
        options={monthOptions}
        onChange={(event, { value }) => {
          setSelectedMonthState(value);
        }}
        value={selectedMonthState}
      />
    </div>
  );
};

export default MonthSelector;
