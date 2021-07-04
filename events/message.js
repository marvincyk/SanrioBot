module.exports = {
  name: "message",
  execute(msg, client) {
    const prefix = process.env.PREFIX;
    if (!msg.content.startsWith(`${prefix}sanrio`) || msg.author.bot) return;

    const command = msg.content.split(/ +/)[1];

    if (!command) {
      return msg.channel.send(
        "Hi, my name is SanrioBot. I'm currently being developed by Marvin. See you soon! 🌈✨"
      );
    }

    if (!client.commands.has(command)) {
      return;
    }

    try {
      client.commands.get(command).execute(msg);
    } catch (err) {
      console.error(err);
      msg.reply("there was an error trying to execute that command!");
    }
  },
};
