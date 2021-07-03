const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();

const fs = require("fs");

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const prefix = process.env.PREFIX;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
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
    message.reply("there was an error trying to execute that command!");
  }
});

mongoose
  .connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: "SanrioBotDB",
  })
  .then(() => console.log("Connected to SanrioBotDB!"))
  .catch((err) => console.log(err));

client.login(process.env.TOKEN);
