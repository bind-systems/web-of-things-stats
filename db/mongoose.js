const mongoose = require("mongoose");

const mongodbUrl = process.env.MONGODB_URL;
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
});
