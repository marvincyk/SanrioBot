const User = require("../models/userSchema");

module.exports = {
  name: "start",
  description: "Start Sanrio journey",
  async execute(msg) {
    const existingUser = await User.findOne({ userID: msg.author.id });
    if (existingUser) {
      return msg.reply("you already exist in our database!");
    }
    const newUser = await User.create({
      userID: msg.author.id,
      serverID: msg.guild.id,
      coins: 1000,
      cards: [],
    });
    newUser.save();
    return msg.reply("your Sanrio journey begins with **1000** coins!");
  },
};
