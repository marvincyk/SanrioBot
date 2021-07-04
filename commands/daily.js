const User = require("../models/userSchema");

module.exports = {
  name: "daily",
  description: "Claim daily reward",
  cooldown: 86400,
  async execute(msg) {
    const existingUser = await User.findOne({ userID: msg.author.id });
    if (!existingUser) {
      return msg.reply(
        "could not find you in our database! Please type **!sanrio start** to begin your Sanrio journey."
      );
    }
    const reward = Math.floor(Math.random() * 100) + 1;
    await User.findOneAndUpdate(
      {
        userID: msg.author.id,
      },
      {
        $inc: {
          coins: reward,
        },
      }
    );
    return msg.reply(
      `you claimed your daily reward and received **${reward}** coins!`
    );
  },
};
