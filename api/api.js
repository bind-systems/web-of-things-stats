const Stat = require("../models/stat");

class Api {
  tags = { stackoverflow: "stackoverflow", github: "github", npm: "npm" };

  async saveStat(data, tag, desc, name, selectors) {
    const newStat = new Stat({ data, tag, desc, name, selectors });
    await newStat.save();
  }
}

module.exports = Api;
