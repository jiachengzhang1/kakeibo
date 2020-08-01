import kakeiboAPI from "@services/kakeiboAPI";

export const register = async (user) => {
  const response = await kakeiboAPI.post("/users/register", user);
  return response.data;
};

export const login = async (user) => {
  const response = await kakeiboAPI.post("/users/login", user);
  return response.data;
};

export const validateToken = async (token) => {
  const response = await kakeiboAPI.post(
    "/users/tokenIsValid",
    {},
    { headers: { "x-auth-token": token } }
  );
  return response.data;
};

export const getValidatedUsers = async (token) => {
  const response = await kakeiboAPI.get("/users/", {
    headers: { "x-auth-token": token },
  });
  return response.data;
};
