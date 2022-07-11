const axios = require("axios");
const token = process.env.GITHUB_TOKEN;

const fetchGithubStars = async (user, repo) => {
  const data = await axios.get(`https://api.github.com/repos/${user}/${repo}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  return data.data.stargazers_count;
};
module.exports = fetchGithubStars;
