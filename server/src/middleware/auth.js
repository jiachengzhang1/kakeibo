const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const url = req.path;
    const request = req.method;

    if (
      request !== "POST" ||
      (url !== "/users/register" &&
        url !== "/users/login" &&
        url !== "/ users/tokenIsValid" &&
        url !== "/users/demo")
    ) {
      const token = req.header("x-auth-token");
      // console.log(req.headers);
      if (!token) {
        return res.status(401).json({ message: "Authorization denied." });
      }
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

      if (!verifiedToken) {
        return res.status(401).json({ message: "Authorization denied." });
      }

      req.user = verifiedToken.id;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = auth;
