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

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, async (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, async (...args) => event.execute(...args, client));
  }
}

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
