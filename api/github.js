const axios = require("axios");
const token = process.env.GITHUB_TOKEN;
const BASE = "https://api.github.com";
const headers = {
  headers: {
    Authorization: `token ${token}`,
  },
};

const fetchGithubRepos = async (topic) => {
  const data = await axios.get(
    `${BASE}/search/repositories?q=topic:${topic}`,
    headers
  );
  return data.data.total_count;
};

const fetchGithubStars = async (user, repo) => {
  const data = await axios.get(`${BASE}/repos/${user}/${repo}`, headers);
  return data.data.stargazers_count;
};
module.exports = { fetchGithubRepos, fetchGithubStars };
