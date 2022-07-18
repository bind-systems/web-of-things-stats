const Stat = require("../models/stat");

class Api {
  tags = { stackoverflow: "stackoverflow", github: "github", npm: "npm" };

  async saveStat(data, tag, desc, name) {
    const newStat = new Stat({ data, tag, desc, name });
    await newStat.save();
  }
}

module.exports = Api;
