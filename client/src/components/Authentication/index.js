import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";

import { register, login } from "@services/Authentication";
import AuthField from "./AuthField";
import AuthFooter from "./AuthFooter";
import ErrorMessage from "./ErrorMessage";
import { getError, validate } from "./helpers";

import "./styles.css";

const Authentication = ({ isRegister = false }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [errorMessage, setErrorMessage] = useState({});

  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (
        validate(userName, password, passwordCheck, isRegister, setErrorMessage)
      ) {
        // send request
        const user = isRegister
          ? { userName, password, passwordCheck }
          : { userName, password };

        const userData = isRegister ? await register(user) : await login(user);

        setUserData(userData);

        localStorage.setItem("auth-token", userData.token);

        history.push("/");
      }
    } catch (error) {
      getError(error.response.data, setErrorMessage);
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
