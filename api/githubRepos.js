const axios = require("axios");
const token = process.env.GITHUB_TOKEN;

const fetchGithubRepos = async (topic) => {
  const data = await axios.get(
    `https://api.github.com/search/repositories?q=topic:${topic}`,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );
  return data.data.total_count;
};
module.exports = fetchGithubRepos;
