const config = require("config");
const mongoose = require("mongoose");

const mongodbUrl = config.get("mongodbUrl");
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
});
