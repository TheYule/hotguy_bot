const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const parser = require("./cmd_parser");
const cmd = require("./commands");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setActivity("👻Botghost.com👻 | Type .help for commands", { type: 2 });
});

client.on("message", msg => {
  parser.parse(msg.content, ".", (command) => {
    cmd.execute(command, msg);
  });
});


fs.readFile("token.yoo", (err, data) => {
    if (err) return;
    client.login(data.toString());
});

module.exports.ping = () => {
    return client.ws.ping;
}