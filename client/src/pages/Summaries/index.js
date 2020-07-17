import React from "react";
import PageHeader from "components/PageHeader";
import ExpenseSummary from "./ExpenseSummary";
import { getWindowSize } from "utils/getWindowSize";

const Summaries = () => {
  return (
    <div>
      <PageHeader option="Monthly Summaries" icon="file outline" />
      {/* {windowSize} */}
      <ExpenseSummary />
    </div>
  );
};

export default Summaries;
