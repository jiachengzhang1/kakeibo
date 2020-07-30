import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";

import "./styles.css";

const ErrorMessage = ({ message = "" }) => {
  return (
    <div className="authentication-error">
      <span>{message}</span>
    </div>
  );
};

const AuthField = ({
  label,
  onChange,
  value,
  type,
  required = false,
  error = "",
}) => {
  return (
    <>
      <label
        htmlFor={`authentication-${label.replace(" ", "").toLowerCase()}`}
        className={required ? "authentication-required" : ""}
      >
        {label}
      </label>
      <input
        id={`authentication-${label.replace(" ", "").toLowerCase()}`}
        type={type}
        value={value}
        onChange={onChange}
      />
      <ErrorMessage message={error} />
    </>
  );
};

const AuthFooter = ({ title, actionName, onClick }) => {
  return (
    <div>
      {title}
      <span onClick={onClick} className="authentication-footer-action">
        {actionName}
      </span>
    </div>
  );
};

const getError = (error) => {
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

const Authentication = ({ isRegister = false }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [errorMessage, setErrorMessage] = useState({});

  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const validate = () => {
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

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (validate()) {
        // send request
        const user = isRegister
          ? { userName, password, passwordCheck }
          : { userName, password };

        const response = isRegister
          ? await axios.post("http://localhost:5000/users/register", user)
          : await axios.post("http://localhost:5000/users/login", user);

        const userData = response.data;

        setUserData(userData);

        localStorage.setItem("auth-token", userData.token);

        history.push("/");
      }
    } catch (error) {
      getError(error.response.data);
    }
  };
  const title = isRegister ? "Register" : "Login";

  const passwordChecking = isRegister ? (
    <>
      <AuthField
        label="Verify Password"
        onChange={(e) => setPasswordCheck(e.target.value)}
        value={passwordCheck}
        type="password"
        required
        error={errorMessage.passwordCheck}
      />
    </>
  ) : null;

  const value = isRegister ? "Register" : "Login";

  const authenticationFooter = isRegister ? (
    <AuthFooter
      title="Already have an account? "
      actionName="Login"
      onClick={() => history.push("/login")}
    />
  ) : (
    <AuthFooter
      title="Need an account? "
      actionName="Register"
      onClick={() => history.push("/register")}
    />
  );

  return (
    <div className="authentication">
      <div className="authentication-content">
        <h2>{title}</h2>
        <form className="authentication-form" onSubmit={submit}>
          <div className="authentication-main-error">
            <ErrorMessage message={errorMessage.main} />
          </div>
          <div className="authentication-fields">
            <AuthField
              label="User Name"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              type="text"
              required
              error={errorMessage.userName}
            />
            <AuthField
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              error={errorMessage.password}
            />
            {passwordChecking}
          </div>
          <input type="submit" value={value} />
        </form>
      </div>
      {authenticationFooter}
    </div>
  );
};

export default Authentication;
