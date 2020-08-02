const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Expense = require("../models/Expense");
const Budget = require("../models/Budget");

const router = require("express").Router();

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.user });
    res.status(200).json({ id: user._id, userName: user.userName });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { userName, password, passwordCheck, email = "" } = req.body;

    // userName, password validation
    if (!userName || !password || !passwordCheck) {
      return res.status(400).json({
        tag: "missing",
        message: "At least one required field is missing.",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        tag: "password",
        message: "Password needs at least 6 characters long.",
      });
    }
    if (password !== passwordCheck) {
      return res.status(400).json({
        tag: "passwordCheck",
        message: "Enter the same password twice for verification.",
      });
    }

    const existingUser = await User.findOne({ userName: userName });
    if (existingUser) {
      return res
        .status(400)
        .json({ tag: "userName", message: "User name already exists." });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      userName,
      password: passwordHash,
      email,
    });

    const savedUser = await newUser.save();

    const token = await jwt.sign({ id: userName }, process.env.JWT_SECRET);

    res.status(200).json({
      token,
      user: {
        id: savedUser._id,
        userName: savedUser.userName,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    // validation
    if (!userName || !password) {
      return res.status(400).json({
        tag: "missing",
        message: "At least one required field is missing.",
      });
    }

    const user = await User.findOne({ userName: userName });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = await jwt.sign(
          { id: user.userName },
          process.env.JWT_SECRET
        );
        res.json({
          token,
          user: {
            id: user._id,
            userName: user.userName,
            email: user.email,
          },
        });
      }
    }

    return res
      .status(400)
      .json({ tag: "faild", message: "Invalid credentials." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/update", async (req, res) => {
  const { password } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  await User.findOneAndUpdate(
    { userName: req.user },
    { $set: { password: passwordHash } }
  );

  res.status(200).json(true);
});

router.delete("/delete", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ userName: req.user });

    await Expense.deleteMany({ username: req.user });
    await Budget.deleteMany({ username: req.user });

    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token || token === null) return res.json(false);

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedToken) return res.json(false);

    const user = await User.findOne({ userName: verifiedToken.id });
    if (!user) return res.json(false);

    return res.json(true);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/demo", async (req, res) => {
  try {
    let existingUser = null;
    let userName = "";
    do {
      userName = Math.random().toString(36).substring(2, 8);
      existingUser = await User.findOne({
        userName: userName,
      });
    } while (existingUser);

    const password = userName;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      userName,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    const token = await jwt.sign({ id: userName }, process.env.JWT_SECRET);

    const demoExpenseData = await Expense.paginate(
      { username: "admin" },
      {
        pagination: false,
        select: {
          _id: false,
          __v: false,
          username: false,
          date_created: false,
        },
      }
    );
    const expenseData = demoExpenseData.docs;
    for (let i = 0; i < expenseData.length; i++) {
      expenseData[i].username = userName;
    }

    const demoBudgetData = await Budget.find(
      { username: "admin" },
      { _id: 0 }
    ).sort({
      date_created: -1,
    });
    const budgetData = demoBudgetData;
    for (let i = 0; i < budgetData.length; i++) {
      budgetData[i].username = userName;
    }

    await Expense.insertMany(expenseData);
    await Budget.insertMany(budgetData);

    res.status(200).json({
      token,
      user: {
        id: savedUser._id,
        userName: savedUser.userName,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
