import kakeiboAPI from "@services/kakeiboAPI";

export const fetchBudgets = async (currentYear, currentMonth) => {
  try {
    const response = await kakeiboAPI.get(
      `/budgets/${currentYear}/${currentMonth}`
    );

    const budgetData = [];
    const allTags = ["living", "culture", "entertainment", "others"];

    response.data.forEach(({ _id, year, month, tag, amount }) => {
      budgetData.push({ _id, year, month, tag, amount });
      allTags.splice(allTags.indexOf(tag), 1);
    });
    return { budgetData, allTags };
  } catch (error) {
    console.error(error);
  }
};

export const createBudget = async (data) => {
  try {
    await kakeiboAPI.post("/budgets", data);
  } catch (error) {
    console.error(error);
  }
};

export const updateBudget = async (id, data) => {
  try {
    await kakeiboAPI.put(`/budgets/${id}`, data);
  } catch (error) {
    console.error(error);
  }
};

export const deleteBudget = async (id) => {
  try {
    await kakeiboAPI.delete(`/budgets/${id}`);
  } catch (error) {
    console.error(error);
  }
};
