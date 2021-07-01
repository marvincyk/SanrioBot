const dotenv = require("dotenv");
dotenv.config();

const Discord = require("discord.js");
const client = new Discord.Client();

const { prefix } = require("./config.json");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.content === `${prefix}sanrio`) {
    msg.channel.send(
      "Hi, my name is SanrioBot. I'm currently being developed by Marvin. See you soon! 🌈✨"
    );
  }
});

client.login(process.env.TOKEN);
