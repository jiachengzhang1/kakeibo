const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const expenseSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    default: "jack",
  },
  transactionName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    validate: (value) => (value >= 0 ? true : false),
  },
  year: {
    type: Number,
    required: true,
    validate: (value) => value.toString().lenght !== 4,
  },
  month: {
    type: Number,
    required: true,
    validate: (value) => value >= 1 && value <= 12,
  },
  date: {
    type: Number,
    required: true,
    validate: (value) => value >= 1 && value <= 31,
  },
  day: {
    type: Number,
    required: true,
    validate: (value) => value >= 0 && value <= 6,
  },
  formated_date: {
    type: Date,
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  tag: {
    type: String,
    required: true,
  },
});

expenseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Expense", expenseSchema);
