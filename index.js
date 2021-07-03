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
  } else if (msg.content === `${prefix}sanrio daily`) {
    msg.channel.send(
      `${msg.author.username} claimed daily reward and received ${
        Math.floor(Math.random() * 100) + 1
      } coins!`
    );
  }
});

client.login(process.env.TOKEN);
