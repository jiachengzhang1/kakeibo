import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

const User = () => {
  const { userData } = useContext(UserContext);

  return (
    <div>
      <h3>Hello, {userData.user.userName}</h3>
    </div>
  );
};

export default User;
