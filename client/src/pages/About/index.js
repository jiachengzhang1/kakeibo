import React from "react";

import "./styles.css";

const About = () => {
  return (
    <div className="about">
      <h3>About</h3>
      <p className="about-content">
        You can enter your daily expenses and monthly budget. Most importantly,
        you are able to see the expenses summary and summary/budget comparison.
        <br />
        <br />
        For a quick starter, you can just click the "Demo Account" button, and
        the applicaiton creates a demo account for you with a random username,
        and the default password is the username. If you are interested, you can
        create an account with the username you prefer. The demo account has
        preloaded expesens and budgets, and the self-registered account is fresh
        start.
        <br />
        <br />
        You can change the password or delete your account through the dropdown
        menu named as the account name.
        <br />
        <br />
        The goal of the application is to learn MERN Stack (MongoDB, ExpressJS,
        ReactJS, NodeJS).
        <br />
        <br />
        Find me on{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/jiachengzhang1"
        >
          GitHub
        </a>{" "}
        or{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://linkedin.com/in/jiachengzhang-developer"
        >
          LinkedIn
        </a>
        .
      </p>
    </div>
  );
};

export default About;
