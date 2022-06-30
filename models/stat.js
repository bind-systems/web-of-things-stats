const mongoose = require("mongoose");
const StatSchema = new mongoose.Schema(
  {
    data: {
      type: Number,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } } // adds createdAt and updatedAt fields
);
const Stat = mongoose.model("Stat", StatSchema);
module.exports = Stat;
