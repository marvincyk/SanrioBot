const Discord = require("discord.js");

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

    if (timestamps.has(msg.author.id)) {
      const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return msg.reply(
          `please wait **${new Date(timeLeft * 1000)
            .toISOString()
            .substr(11, 8)}** before reusing the **${command.name}** command.`
        );
      }
    }

    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

    try {
      command.execute(msg);
    } catch (err) {
      console.error(err);
      msg.reply("there was an error trying to execute that command!");
    }
  },
};
