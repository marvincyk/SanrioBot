const User = require("../models/userSchema");

module.exports = {
  name: "balance",
  description: "Check balance (coins)",
  async execute(msg) {
    const existingUser = await User.findOne({ userID: msg.author.id });
    if (!existingUser) {
      return msg.reply(
        "could not find you in our database! Please type **!sanrio start** to begin your Sanrio journey."
      );
    }
    return msg.reply(`your balance is **${existingUser.coins}** coins.`);
  },
};
