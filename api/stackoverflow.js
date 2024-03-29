const axios = require("axios");
const Api = require("./api");
const BASE = "https://api.stackexchange.com";
const token = process.env.STACKEXCHANGE_TOKEN;

class StackoverflowApi extends Api {
  statTag = this.tags.stackoverflow;
  async fetchStackoverflowQuestions(tag, selectors) {
    const data = await axios.get(
      `${BASE}/questions?site=stackoverflow&tagged=${tag}&key=${token}`
    );
    const statData = data.data.items.length;
    const statDesc = `Questions on StackOverFlow tagged with '${tag}'`;
    const statName = `${tag} Questions`;
    await this.saveStat(statData, this.statTag, statDesc, statName, selectors);
  }
}
const stackoverflowApi = new StackoverflowApi();
Object.freeze(stackoverflowApi);
module.exports = stackoverflowApi;
