import kakeiboAPI from "@services/kakeiboAPI";

export const fetchBudgets = async (currentYear, currentMonth, token) => {
  try {
    const response = await kakeiboAPI.get(
      `/budgets/${currentYear}/${currentMonth}`,
      {
        headers: { "x-auth-token": token },
      }
    );

    const budgetData = [];
    const allTags = ["living", "culture", "entertainment", "others"];

    response.data.forEach(({ _id, year, month, tag, amount }) => {
      budgetData.push({ _id, year, month, tag, amount });
      allTags.splice(allTags.indexOf(tag), 1);
    });
    return { budgetData, allTags };
  } catch (error) {
    console.error(error.response.data);
  }
};

export const createBudget = async (data, token) => {
  try {
    await kakeiboAPI.post("/budgets", data, {
      headers: { "x-auth-token": token },
    });
  } catch (error) {
    console.error(error.response.data);
  }
};

export const updateBudget = async (id, data, token) => {
  try {
    await kakeiboAPI.put(`/budgets/${id}`, data, {
      headers: { "x-auth-token": token },
    });
  } catch (error) {
    console.error(error.response.data);
  }
};

export const deleteBudget = async (id, token) => {
  try {
    await kakeiboAPI.delete(`/budgets/${id}`, {
      headers: { "x-auth-token": token },
    });
  } catch (error) {
    console.error(error);
  }
};
