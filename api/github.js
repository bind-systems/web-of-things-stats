const axios = require("axios");
const Api = require("./api");
const BASE = "https://api.github.com";
const token = process.env.GITHUB_TOKEN;
const headers = {
  headers: {
    Authorization: `token ${token}`,
  },
};

class GithubApi extends Api {
  statTag = this.tags.github;
  async fetchGithubRepos(topic) {
    const data = await axios.get(
      `${BASE}/search/repositories?q=topic:${topic}`,
      headers
    );
    const statData = data.data.total_count;
    const statDesc = `Repos on Github with the topic '${topic}'`;
    const statName = `${topic} Repos`;
    await this.saveStat(statData, this.statTag, statDesc, statName);
  }

  async fetchGithubStars(user, repo) {
    const data = await axios.get(`${BASE}/repos/${user}/${repo}`, headers);
    const statData = data.data.stargazers_count;
    const statDesc = `Stars on ${user}/${repo} repo on Github`;
    const statName = `${repo} stars`;
    await this.saveStat(statData, this.statTag, statDesc, statName);
  }
}
const githubApi = new GithubApi();
Object.freeze(githubApi);
module.exports = githubApi;
