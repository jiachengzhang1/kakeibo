import kakeiboAPI from "@api/kakeiboAPI";

export const fetchExpenseSummary = async (selectedYear, selectedMonth) => {
  const response = await kakeiboAPI.get(
    `/summaries/expenses/${selectedYear}/${selectedMonth}`
  );

  const data = {};
  response.data.spendingSummary.forEach(({ _id, totalAmount }) => {
    data[_id] = totalAmount;
  });

  return data;
};

export const fetchBudgetVSExpenseSummary = async (
  selectedYear,
  selectedMonth
) => {
  const response = await kakeiboAPI.get(
    `/summaries/budgets/${selectedYear}/${selectedMonth}`
  );
  return response.data;
};
