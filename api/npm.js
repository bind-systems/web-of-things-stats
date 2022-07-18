const axios = require("axios");
const Api = require("./api");
const BASE = "https://api.npmjs.org/versions";

class NpmApi extends Api {
  statTag = this.tags.npm;
  getNumberOfDownloads(data) {
    if (!Object.values(data).length) return 0;
    return Object.values(data).reduce((a, b) => a + b);
  }

  async fetchNpmDownloads(npmPackage, innerPackage) {
    let statData, statDesc, statName;
    if (innerPackage) {
      const data = await axios.get(
        `${BASE}/${npmPackage}%2F${innerPackage}/last-week`
      );
      statData = this.getNumberOfDownloads(data.data.downloads);
      statDesc = `Downloads of ${npmPackage}/${innerPackage} package the previous week`;
      statName = `${innerPackage} Downloads`;
    } else {
      const data = await axios.get(`${BASE}/${npmPackage}/last-week`);
      statData = this.getNumberOfDownloads(data.data.downloads);
      statDesc = `Downloads of ${npmPackage} package the previous week`;
      statName = `${npmPackage} Downloads`;
    }
    await this.saveStat(statData, this.statTag, statDesc, statName);
  }
}
const npmApi = new NpmApi();
Object.freeze(npmApi);
module.exports = npmApi;
