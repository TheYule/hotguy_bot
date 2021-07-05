const Discord = require("discord.js");
const client = new Discord.Client();
const { token, prefix } = require("./config.json");
const parser = require("./cmd_parser");
const cmd = require("./commands");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setActivity("👻Botghost.com👻 | Type .help for commands", { type: 2 });
});

client.on("message", msg => { parser.parse(msg, prefix, (command) => { cmd.execute(command, msg); }) });

client.login(token);

module.exports.ping = () => { return client.ws.ping; }