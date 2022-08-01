const githubApi = require("../api/github");
const npmApi = require("../api/npm");
const stackoverflowApi = require("../api/stackoverflow");
const statistics = require("./stats.json");

const fetchStats = async () => {
  try {
    for (const { tag, selectors } of statistics.stackoverflowQuestions)
      await stackoverflowApi.fetchStackoverflowQuestions(tag, selectors);

    for (const { topic, selectors } of statistics.githubRepos)
      await githubApi.fetchGithubRepos(topic, selectors);

    for (const { repo, selectors } of statistics.githubStars)
      await githubApi.fetchGithubStars(repo[0], repo[1], selectors);

    for (const { package, selectors } of statistics.npmDownloads) {
      package[1]
        ? await npmApi.fetchNpmDownloads(package[0], selectors, package[1])
        : await npmApi.fetchNpmDownloads(package[0], selectors);
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = fetchStats;
