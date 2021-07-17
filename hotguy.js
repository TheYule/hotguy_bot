const Discord = require("discord.js");
const client = new Discord.Client();
const { token, prefix } = require("./config.json");
const parser = require("./cmd_parser");
const cmd = require("./commands");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setActivity("φ TheYule.xyz φ | Type .help for commands", {
    type:"STREAMING",
    url: "https://www.twitch.tv/TheYule"
});
});

client.on("message", msg => { parser.parse(msg, prefix, (command) => { cmd.execute(command, msg); }) });

client.login(token);

module.exports.ping = () => { return client.ws.ping; }