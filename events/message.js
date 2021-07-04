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

    try {
      command.execute(msg);
    } catch (err) {
      console.error(err);
      msg.reply("there was an error trying to execute that command!");
    }
  },
};
