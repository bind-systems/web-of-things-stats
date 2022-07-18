const axios = require("axios");
const Api = require("./api");
const BASE = "https://api.stackexchange.com";
const stackexhangeToken = process.env.STACKEXCHANGE_TOKEN;

class StackoverflowApi extends Api {
  statTag = this.tags.stackoverflow;
  async fetchStackoverflowQuestions(tag) {
    const data = await axios.get(
      `${BASE}/questions?site=stackoverflow&tagged=${tag}&key=${stackexhangeToken}`
    );
    const statData = data.data.items.length;
    const statDesc = `Questions on StackOverFlow tagged with '${tag}'`;
    const statName = `${tag} Questions`;
    await this.saveStat(statData, this.statTag, statDesc, statName);
  }
}
const stackoverflowApi = new StackoverflowApi();
Object.freeze(stackoverflowApi);
module.exports = stackoverflowApi;
