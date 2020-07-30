import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import UserContext from "../context/UserContext";
import axios from "axios";

import AuthWrapper from "./AuthWrapper";

import "./styles.css";

const App = () => {
  const [userData, setUserData] = useState({});

  const checkLoggedIn = async () => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      // console.log(token);
      const response = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        {},
        { headers: { "x-auth-token": token } }
      );
      // console.log(response.data);
      if (response.data) {
        const userResponse = await axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userResponse.data,
        });
        // console.log(userResponse);
      }
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const authenticated = userData.user !== undefined;

  return (
    <div>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <AuthWrapper authenticated={authenticated} />
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
