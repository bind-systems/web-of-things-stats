const githubApi = require("./api/github");
const npmApi = require("./api/npm");
const stackoverflowApi = require("./api/stackoverflow");

const fetchStats = async () => {
  try {
    await stackoverflowApi.fetchStackoverflowQuestions("web-of-things");
    await stackoverflowApi.fetchStackoverflowQuestions("thing-description");

    await githubApi.fetchGithubRepos("web-of-things");
    await githubApi.fetchGithubStars("w3c", "wot");
    await githubApi.fetchGithubStars("eclipse", "editdor");
    await githubApi.fetchGithubStars("oeg-upm", "wot-jtd");
    await githubApi.fetchGithubStars("oeg-upm", "wot-hive");
    await githubApi.fetchGithubStars("UniBO-PRISMLab", "wam");
    await githubApi.fetchGithubStars("namib-project", "dart_wot");
    await githubApi.fetchGithubStars("w3c", "wot-thing-description");
    await githubApi.fetchGithubStars("w3c", "wot-architecture");
    await githubApi.fetchGithubStars("w3c", "wot-scripting-api");

    await npmApi.fetchNpmDownloads("@node-wot", "core");
    await npmApi.fetchNpmDownloads("@node-wot", "binding-modbus");
    await npmApi.fetchNpmDownloads("@node-wot", "binding-http");
    await npmApi.fetchNpmDownloads("@node-wot", "binding-firestore");
    await npmApi.fetchNpmDownloads("@node-wot", "binding-file");
    await npmApi.fetchNpmDownloads("@node-wot", "binding-mbus");
    await npmApi.fetchNpmDownloads("@node-wot", "td-tools");
    await npmApi.fetchNpmDownloads("@node-wot", "binding-mqtt");
    await npmApi.fetchNpmDownloads("@node-wot", "binding-coap");
    await npmApi.fetchNpmDownloads("@node-wot", "cli");
    await npmApi.fetchNpmDownloads("@node-wot", "binding-opcua");
    await npmApi.fetchNpmDownloads("@node-wot", "browser-bundle");
    await npmApi.fetchNpmDownloads("@node-wot", "binding-websockets");
    await npmApi.fetchNpmDownloads("@node-wot", "binding-netconf");
    await npmApi.fetchNpmDownloads("@node-wot", "binding-oracle");
    await npmApi.fetchNpmDownloads("@node-wot", "binding-fujitsu");
    await npmApi.fetchNpmDownloads("node-red-contrib-wot-discovery");
    await npmApi.fetchNpmDownloads("node-red-contrib-web-of-things");
    await npmApi.fetchNpmDownloads("wot-testbench");
    await npmApi.fetchNpmDownloads("wot-thing-model-types");
    await npmApi.fetchNpmDownloads("wot-thing-description-types");
    await npmApi.fetchNpmDownloads("wot-typescript-definitions");
    await npmApi.fetchNpmDownloads("node-red-nodegen");
  } catch (e) {
    console.log(e);
  }
};

module.exports = fetchStats;
