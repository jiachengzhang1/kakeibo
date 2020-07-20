const mongoose = require("mongoose");
// const mongoosePaginate = require("mongoose-paginate-v2");

const budgetSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    default: "jack",
  },
  tag: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    validate: (value) => value >= 0,
  },
  year: {
    type: Number,
    required: true,
    validate: (value) => value.toString().length === 4,
  },
  month: {
    type: Number,
    required: true,
    validate: (value) => value >= 1 && value <= 12,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

// budgetSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Budget", budgetSchema);
