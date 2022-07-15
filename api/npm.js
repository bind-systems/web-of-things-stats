const axios = require("axios");
const BASE = "https://api.npmjs.org/versions";

const fetchNpmDownloads = async (package, innerPackage) => {
  if (innerPackage) {
    const data = await axios.get(
      `${BASE}/${package}%2F${innerPackage}/last-week`
    );
    return getNumberOfDownloads(data.data.downloads);
  }
  const data = await axios.get(`${BASE}/${package}/last-week`);
  return getNumberOfDownloads(data.data.downloads);
};

const getNumberOfDownloads = (data) => {
  if (!Object.values(data).length) return 0;
  return Object.values(data).reduce((a, b) => a + b);
};

module.exports = fetchNpmDownloads;
