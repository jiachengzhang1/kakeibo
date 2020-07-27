import React from "react";
import { Select } from "semantic-ui-react";

import { MONTH_MAP } from "../../utils/constants";
import "./styles.css";

const MonthSelector = ({
  selectedYearMonth,
  updateYearMonth,
  yearsWithMonths,
}) => {
  const { selectedYear, selectedMonth } = selectedYearMonth;

  const years = [{ key: 0, text: "All Years", value: 0 }];
  const monthOptions = [{ key: 0, text: "All months", value: 0 }];

  yearsWithMonths.forEach(({ year, months }) => {
    years.push({
      key: year,
      text: year,
      value: year,
    });

    if (year === selectedYear) {
      months.forEach((month) => {
        monthOptions.push({
          key: month,
          text: MONTH_MAP[month],
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
        onChange={(event, { value }) => {
          updateYearMonth({ selectedYear: value, selectedMonth: 0 });
        }}
        value={selectedYear}
      />
      <Select
        className="input-select month"
        compact
        disabled={selectedYear === 0}
        options={monthOptions}
        onChange={(event, { value }) => {
          updateYearMonth({
            ...selectedYearMonth,
            ...{ selectedMonth: value },
          });
        }}
        value={selectedMonth}
      />
    </div>
  );
};

export default MonthSelector;
