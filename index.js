require("./db/mongoose");
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const fetchStats = require("./stats");
const statRouter = require("./routers/stat");

const port = process.env.PORT;
const app = express();
app.use(cors({ origin: "*" }));
app.use(statRouter);

cron.schedule("0 0 */14 * *", () => {
  fetchStats();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
