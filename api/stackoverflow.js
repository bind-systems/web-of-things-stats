const axios = require("axios");
const token = process.env.STACKEXCHANGE_TOKEN;

const fetchStackoverflowQuestions = async (tag) => {
  const data = await axios.get(
    `https://api.stackexchange.com/questions?site=stackoverflow&tagged=${tag}&key=${token}`
  );
  return data.data.items.length;
};
module.exports = fetchStackoverflowQuestions;
