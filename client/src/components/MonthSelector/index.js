import React from "react";
import { Select } from "semantic-ui-react";

import { MONTH_MAP } from "@utils/constants";
import "./styles.css";

const MonthSelector = ({
  selectedYearMonth,
  updateYearMonth,
  yearsWithMonths,
  disableAllOption = false,
}) => {
  const { selectedYear, selectedMonth } = selectedYearMonth;

  const years = disableAllOption
    ? []
    : [{ key: 0, text: "All Years", value: 0 }];
  const monthOptions = disableAllOption
    ? []
    : [{ key: 0, text: "All months", value: 0 }];

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

  const findFirstMonthOfYear = (targetYear) => {
    for (let i = 0; i < yearsWithMonths.length; i++) {
      const { year, months } = yearsWithMonths[i];
      if (year === targetYear) return months[0];
    }
    return -1; // no such year
  };

  return (
    <div className="month-selector">
      <Select
        className="input-select year"
        compact
        options={years}
        onChange={(event, { value }) => {
          const newSelectedYearMonth = {
            selectedYear: value,
            selectedMonth: 0,
          };
          if (disableAllOption) {
            const month = findFirstMonthOfYear(value);
            if (month !== -1) {
              newSelectedYearMonth.selectedMonth = month;
            }
          }

          updateYearMonth(newSelectedYearMonth);
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
