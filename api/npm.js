const axios = require("axios");

const fetchNpmDownloads = async (package1, package2) => {
  const data = await axios.get(
    `https://api.npmjs.org/versions/${package1}%2F${package2}/last-week`
  );
  return Object.values(data.data.downloads).reduce((a, b) => a + b);
};

const fetchNpmDownloads2 = async (package) => {
  const data = await axios.get(
    `https://api.npmjs.org/versions/${package}/last-week`
  );
  return Object.values(data.data.downloads).reduce((a, b) => a + b);
};

module.exports = { fetchNpmDownloads, fetchNpmDownloads2 };
