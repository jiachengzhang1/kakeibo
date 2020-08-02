import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { getValidatedUsers, validateToken } from "@services/Authentication";
import UserContext from "../context/UserContext";
import AuthWrapper from "./AuthWrapper";

import "./styles.css";

const App = () => {
  const [userData, setUserData] = useState({});
  // const [authenticated, setAuthenticated] = useState(false);

  const checkLoggedIn = async () => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      const tokenValid = await validateToken(token);
      if (tokenValid) {
        const data = await getValidatedUsers(token);
        setUserData({
          token,
          user: data,
        });
      } else {
        localStorage.removeItem("auth-token");
      }
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <AuthWrapper />
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
