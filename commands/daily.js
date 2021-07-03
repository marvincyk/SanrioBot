module.exports = {
  name: "daily",
  description: "Claim daily reward",
  execute(msg) {
    msg.channel.send(
      `${msg.author.username} claimed daily reward and received ${
        Math.floor(Math.random() * 100) + 1
      } coins!`
    );
  },
};
