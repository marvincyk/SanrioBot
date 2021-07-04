const User = require("../models/userSchema");

module.exports = {
  name: "start",
  description: "Start Sanrio journey",
  async execute(msg) {
    const newUser = await User.create({
      userID: msg.author.id,
      serverID: msg.guild.id,
      coins: 1000,
      cards: [],
    });
    newUser.save();
  },
};
