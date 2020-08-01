import kakeiboAPI from "@services/kakeiboAPI";

export const expenseRequest = async (
  request = { action: "GET_EXPENSES_WITH_YEARS_AND_MONTHS", payload: {} },
  page = 1,
  limit = 15,
  year = 0,
  month = 0
) => {
  const { action, payload, token } = request;

  const query = {};

  if (year !== 0) {
    query.year = year;
  }

  if (month !== 0) {
    query.month = month;
  }

  const body = {
    action,
    payload,
    query,
    options: {
      page,
      limit,
      sort: { formated_date: "desc", date_created: "desc" },
    },
  };
  const response = await kakeiboAPI.post("/expenses", body, {
    headers: { "x-auth-token": token },
  });

  return response.data;
};
