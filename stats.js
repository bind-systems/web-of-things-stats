const Stat = require("./models/stat");
const fetchGithubRepos = require("./api/githubRepos");
const fetchGithubStars = require("./api/githubStars");
const { fetchNpmDownloads, fetchNpmDownloads2 } = require("./api/npm");
const fetchStackoverflowQuestions = require("./api/stackoverflow");

const fetchStats = async () => {
  try {
    const StackoverflowQuestionsWot = await fetchStackoverflowQuestions(
      "web-of-things"
    );
    await saveStat(
      StackoverflowQuestionsWot,
      "stackoverflow",
      "Questions on StackOverFlow tagged with 'web-of-things'"
    );
    const StackoverflowQuestionsTd = await fetchStackoverflowQuestions(
      "thing-description"
    );
    await saveStat(
      StackoverflowQuestionsTd,
      "stackoverflow",
      "Questions on StackOverFlow tagged with 'web-of-things'"
    );

    const githubReposWot = await fetchGithubRepos("web-of-things");
    await saveStat(
      githubReposWot,
      "github",
      "Repos on Github with the topic 'web-of-things'"
    );

    const githubStarsWot = await fetchGithubStars("w3c", "wot");
    await saveStat(githubStarsWot, "github", "Stars on w3c wot repo on Github");

    const npmDownloadsWotCore = await fetchNpmDownloads("@node-wot", "core");
    await saveStat(
      npmDownloadsWotCore,
      "npm",
      "Downloads of node-wot core package the previous week"
    );

    const npmDownloadsWotModbus = await fetchNpmDownloads(
      "@node-wot",
      "binding-modbus"
    );
    await saveStat(
      npmDownloadsWotModbus,
      "npm",
      "Downloads of node-wot binding-modbus package the previous week"
    );

    const npmDownloadsWotHttp = await fetchNpmDownloads(
      "@node-wot",
      "binding-http"
    );
    await saveStat(
      npmDownloadsWotHttp,
      "npm",
      "Downloads of node-wot binding-http package the previous week"
    );

    const npmDownloadsWotFirestore = await fetchNpmDownloads(
      "@node-wot",
      "binding-firestore"
    );
    await saveStat(
      npmDownloadsWotFirestore,
      "npm",
      "Downloads of node-wot binding-firestore package the previous week"
    );

    const npmDownloadsWotFile = await fetchNpmDownloads(
      "@node-wot",
      "binding-file"
    );
    await saveStat(
      npmDownloadsWotFile,
      "npm",
      "Downloads of node-wot binding-file package the previous week"
    );

    const npmDownloadsWotMbus = await fetchNpmDownloads(
      "@node-wot",
      "binding-mbus"
    );
    await saveStat(
      npmDownloadsWotMbus,
      "npm",
      "Downloads of node-wot binding-mbus package the previous week"
    );

    const npmDownloadsWotTdtools = await fetchNpmDownloads(
      "@node-wot",
      "td-tools"
    );
    await saveStat(
      npmDownloadsWotTdtools,
      "npm",
      "Downloads of node-wot td-tools package the previous week"
    );

    const npmDownloadsWotMqtt = await fetchNpmDownloads(
      "@node-wot",
      "binding-mqtt"
    );
    await saveStat(
      npmDownloadsWotMqtt,
      "npm",
      "Downloads of node-wot binding-mqtt package the previous week"
    );

    const npmDownloadsWotCoap = await fetchNpmDownloads(
      "@node-wot",
      "binding-coap"
    );
    await saveStat(
      npmDownloadsWotCoap,
      "npm",
      "Downloads of node-wot binding-coap package the previous week"
    );

    const npmDownloadsWotCli = await fetchNpmDownloads("@node-wot", "cli");
    await saveStat(
      npmDownloadsWotCli,
      "npm",
      "Downloads of node-wot cli package the previous week"
    );

    const npmDownloadsWotOpcua = await fetchNpmDownloads(
      "@node-wot",
      "binding-opcua"
    );
    await saveStat(
      npmDownloadsWotOpcua,
      "npm",
      "Downloads of node-wot binding-opcua package the previous week"
    );

    const npmDownloadsWotBrowserBundle = await fetchNpmDownloads(
      "@node-wot",
      "browser-bundle"
    );
    await saveStat(
      npmDownloadsWotBrowserBundle,
      "npm",
      "Downloads of node-wot browser-bundle package the previous week"
    );

    const npmDownloadsWotWebsockets = await fetchNpmDownloads(
      "@node-wot",
      "binding-websockets"
    );
    await saveStat(
      npmDownloadsWotWebsockets,
      "npm",
      "Downloads of node-wot binding-websockets package the previous week"
    );

    const npmDownloadsWotNetconf = await fetchNpmDownloads(
      "@node-wot",
      "binding-netconf"
    );
    await saveStat(
      npmDownloadsWotNetconf,
      "npm",
      "Downloads of node-wot binding-netconf package the previous week"
    );

    const npmDownloadsWotOracle = await fetchNpmDownloads(
      "@node-wot",
      "binding-oracle"
    );
    await saveStat(
      npmDownloadsWotOracle,
      "npm",
      "Downloads of node-wot binding-oracle package the previous week"
    );

    const npmDownloadsWotFujitsu = await fetchNpmDownloads(
      "@node-wot",
      "binding-fujitsu"
    );
    await saveStat(
      npmDownloadsWotFujitsu,
      "npm",
      "Downloads of node-wot binding-fujitsu package the previous week"
    );

    const npmDownloadsWotContribDiscovery = await fetchNpmDownloads2(
      "node-red-contrib-wot-discovery"
    );
    await saveStat(
      npmDownloadsWotContribDiscovery,
      "npm",
      "Downloads of node-red-contrib-wot-discovery package the previous week"
    );

    const npmDownloadsWotContribWot = await fetchNpmDownloads2(
      "node-red-contrib-web-of-things"
    );
    await saveStat(
      npmDownloadsWotContribWot,
      "npm",
      "Downloads of node-red-contrib-web-of-things package the previous week"
    );

    const npmDownloadsWotTestbench = await fetchNpmDownloads2("wot-testbench");
    await saveStat(
      npmDownloadsWotTestbench,
      "npm",
      "Downloads of wot-testbench package the previous week"
    );

    const npmDownloadsWotModeltypes = await fetchNpmDownloads2(
      "wot-thing-model-types"
    );
    await saveStat(
      npmDownloadsWotModeltypes,
      "npm",
      "Downloads of wot-thing-model-types package the previous week"
    );

    const npmDownloadsWotDesctypes = await fetchNpmDownloads2(
      "wot-thing-description-types"
    );
    await saveStat(
      npmDownloadsWotDesctypes,
      "npm",
      "Downloads of wot-thing-description-types package the previous week"
    );

    const npmDownloadsWotTsdefinitions = await fetchNpmDownloads2(
      "wot-typescript-definitions"
    );
    await saveStat(
      npmDownloadsWotTsdefinitions,
      "npm",
      "Downloads of wot-typescript-definitions package the previous week"
    );

    const npmDownloadsNodegen = await fetchNpmDownloads2("node-red-nodegen");
    await saveStat(
      npmDownloadsNodegen,
      "npm",
      "Downloads of node-red-nodegen package the previous week"
    );

    const githubStarsEditdor = await fetchGithubStars("eclipse", "editdor");
    await saveStat(
      githubStarsEditdor,
      "github",
      "Stars on editdor repo on Github"
    );

    const githubStarsWotJtd = await fetchGithubStars("oeg-upm", "wot-jtd");
    await saveStat(
      githubStarsWotJtd,
      "github",
      "Stars on the Java Api for WoT repo on Github"
    );

    const githubStarsWotHive = await fetchGithubStars("oeg-upm", "wot-hive");
    await saveStat(
      githubStarsWotHive,
      "github",
      "Stars on the WoT Hive an implementation of a WoT Directory repo on Github"
    );

    const githubStarsWam = await fetchGithubStars("UniBO-PRISMLab", "wam");
    await saveStat(
      githubStarsWam,
      "github",
      "Stars on WoT Application Manager repo on Github"
    );

    const githubStarsWotDart = await fetchGithubStars(
      "namib-project",
      "dart_wot"
    );
    await saveStat(
      githubStarsWotDart,
      "github",
      "Stars on WoT Implementation in dart repo on Github"
    );

    const githubStarsWotTd = await fetchGithubStars(
      "w3c",
      "wot-thing-description"
    );
    await saveStat(
      githubStarsWotTd,
      "github",
      "Stars on Web of Things (WoT) Thing Description repo on Github"
    );

    const githubStarsWotArch = await fetchGithubStars(
      "w3c",
      "wot-architecture"
    );
    await saveStat(
      githubStarsWotArch,
      "github",
      "Stars on w3c wot-architecture repo on Github"
    );

    const githubStarsWotScriptingApi = await fetchGithubStars(
      "w3c",
      "wot-scripting-api"
    );
    await saveStat(
      githubStarsWotScriptingApi,
      "github",
      "Stars on w3c wot-scripting-api repo on Github"
    );
  } catch (e) {
    console.log(e);
  }
};

const saveStat = async (data, tag, desc) => {
  const newStat = new Stat({ data, tag, desc });
  await newStat.save();
};

module.exports = fetchStats;
