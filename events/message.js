module.exports = {
  name: "message",
  execute(msg, client) {
    const prefix = process.env.PREFIX;
    if (!msg.content.startsWith(`${prefix}sanrio`) || msg.author.bot) return;

    const commandName = msg.content.split(/ +/)[1];

    if (!commandName) {
      return msg.channel.send(
        "Hi, my name is SanrioBot. I'm currently being developed by Marvin. See you soon! 🌈✨"
      );
    }

    if (!client.commands.has(commandName)) {
      return;
    }

    const command = client.commands.get(commandName);

    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `please wait **${timeLeft.toFixed(
            1
          )}** more second(s) before reusing the **${command.name}** command.`
        );
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      command.execute(msg);
    } catch (err) {
      console.error(err);
      msg.reply("there was an error trying to execute that command!");
    }
  },
};
