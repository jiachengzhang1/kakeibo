const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes");
const auth = require("./middleware/auth");

dotenv.config();

// connect to mongodb
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("Connected to database!");
  }
);

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(auth);
app.use(routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
