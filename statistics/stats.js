const githubApi = require("../api/github");
const npmApi = require("../api/npm");
const stackoverflowApi = require("../api/stackoverflow");
const statistics = require("./stats.json");

const fetchStats = async () => {
  try {
    for (const topic of statistics.stackoverflowQuestions)
      await stackoverflowApi.fetchStackoverflowQuestions(topic);

    for (const topic of statistics.githubRepos)
      await githubApi.fetchGithubRepos(topic);

    for (const [userOrOrganization, repo] of statistics.githubStars)
      await githubApi.fetchGithubStars(userOrOrganization, repo);

    for (const [package, innerPackage] of statistics.npmDownloads) {
      innerPackage
        ? await npmApi.fetchNpmDownloads(package, innerPackage)
        : await npmApi.fetchNpmDownloads(package);
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = fetchStats;
