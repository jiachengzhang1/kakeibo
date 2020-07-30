export const getError = (error, setErrorMessage) => {
  switch (error.tag) {
    case "missing":
      setErrorMessage({ main: error.message });
      break;
    case "userName":
      setErrorMessage({ userName: error.message });
      break;
    case "password":
      setErrorMessage({ password: error.message });
      break;
    case "passwordCheck":
      setErrorMessage({ passwordCheck: error.message });
      break;
    case "faild":
      setErrorMessage({ main: error.message });
      break;
    default:
      break;
  }
};

export const validate = (
  userName,
  password,
  passwordCheck,
  isRegister,
  setErrorMessage
) => {
  let valid = true,
    error = {};
  if (!userName) {
    error.userName = "User name is required.";
    valid = false;
  }

  if (!password) {
    error.password = "Password is required.";
    valid = false;
  } else if (password.length < 6) {
    error.password = "Password needs at least 6 characters long.";
    valid = false;
  }

  if (isRegister && !passwordCheck) {
    error.passwordCheck = "Verify password is required.";
    valid = false;
  } else if (
    isRegister &&
    passwordCheck &&
    password &&
    password !== passwordCheck
  ) {
    error.passwordCheck = "Doesn't match the password.";
    valid = false;
  }
  setErrorMessage(error);

  return valid;
};
