import kakeiboAPI from "@services/kakeiboAPI";
import axios from "axios";

export const cancelToken = axios.CancelToken.source();

export const fetchExpenseSummary = async (
  selectedYear,
  selectedMonth,
  token
) => {
  try {
    const response = await kakeiboAPI.get(
      `/summaries/expenses/${selectedYear}/${selectedMonth}`,
      {
        headers: { "x-auth-token": token },
      }
    );

    const data = {};
    response.data.spendingSummary.forEach(({ _id, totalAmount }) => {
      data[_id] = totalAmount;
    });

    return data;
  } catch (error) {
    console.error(error.response.data);
  }
};

export const fetchBudgetVSExpenseSummary = async (
  selectedYear,
  selectedMonth,
  token
) => {
  try {
    const response = await kakeiboAPI.get(
      `/summaries/budgets/${selectedYear}/${selectedMonth}`,
      {
        headers: { "x-auth-token": token },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
};

export const fetchYearsWithMonths = async (token) => {
  try {
    const response = await kakeiboAPI.get(`/summaries/months`, {
      headers: { "x-auth-token": token },
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
};
