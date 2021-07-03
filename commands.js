const bot = require("./hotguy");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const Canvas = require("canvas");

const remainder_args = args => { var arr = args; arr.shift(); return arr.join(" "); }

const mod_log = msg => {
    if (msg.guild.channels.cache.find(i => i.name === "mod-logs")) {
        return;
    } else {
        msg.guild.channels.create("mod-logs", {
            type: "text",
            permissionOverwrites: [{
                id: msg.guild.id,
                allow: ["VIEW_CHANNEL"],
                deny: ["SEND_MESSAGES"]
            }]
        });
    }
}

const mute = msg => {
    let role = msg.guild.roles.cache.find(x => x.name == "Muted");
    if(!role) {
        msg.guild.roles.create({
            data: {
                name: "Muted",
                color: "LIGHT_GRAY",
            },
            reason: "To mute people"
        });
    }
}

const error = (msg, error, cmd) => {
    const embed = new MessageEmbed()
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .setColor(0xe74c3c)
        .setDescription(":x: " + error + "\n\n`" + cmd + "`");
    
    msg.channel.send(embed);
}

const warn = (msg, user, reason) => {
    mod_log(msg);

    const embed = new MessageEmbed()
        .setColor(0x3498db)
        .setDescription(user.toString() + " was warned by " + msg.author.toString() + ".\n\nReason: " + reason)
        .setFooter("Moderation");

    msg.guild.channels.cache.find(i => i.name === "mod-logs").send(embed);
}

const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');

	let fontSize = 70;

	do {
		context.font = `${fontSize -= 10}px sans-serif`;
	} while (context.measureText(text).width > canvas.width - 50);

	return context.font;
};

const execute = async (data, msg) => {
    const args = data.trim().split(" ");
    const command = args[0];

    const pfp = "https://images-ext-1.discordapp.net/external/MBxcFgNaHP_16cmi4feNrJwJBbYniSPhuO3ZcFPQuFc/https/cdn.discordapp.com/avatars/859505952696041523/8a3b2ab1d9733ef0f76cd10a9cbb177b.webp";

    switch (command) {
        case "ping":
            msg.channel.send("pinging...").then(m => {
                m.edit(`Latency is ${Date.now() - msg.createdTimestamp}ms. Bot Latency is ${Math.round(bot.ping())}ms`);
            });
            break;
        case "level":
            break;
        case "poo":
            msg.channel.send("fart poo funny stinky");
            break;
        case "TheYule":
            msg.channel.send("The Yule!");
            break;
        case "spamping":
            msg.channel.send("@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone@everyone");
            break;
        case "NullifiedEncryptor":
            msg.channel.send("Nullified Encryptor!");
            break;
        case "channel":
            msg.channel.send("https://www.youtube.com/channel/UCwIs76BitfTvwO-4c42Vjbg");
            break;
        case "gayboy":
            msg.channel.send("HotGuy4%HD is a gay boy");
            break;
        case "memes":
            const embed1 = new MessageEmbed()
                .setTitle("Meme Id's")
                .setColor("gray")
                .addFields(
                    { name: "How to create a meme", value: "First choose a template from below and copy its `#ID` and note its required `[captions]`. Next run `.create_meme <id> <first caption, second caption> ` with the correct number of [captions] seperated by commas." },
                    { name: "Template IDs", value: "Error:\n`Unable to fetch templates. ERR_NO_TEMPLATES 0x2763h279s632`" }
                );
            
            msg.channel.send(embed1);
            break;
        case "create_meme":
            if (args[1] == "" || args[1] == null) {
                error(msg, "Command is missing components", ".create_meme <message>");
            } else {
                const canvas = Canvas.createCanvas(800, 450);
                const context = canvas.getContext("2d");

                const background = await Canvas.loadImage("./meme.png");
                context.drawImage(background, 0, 0, canvas.width, canvas.height);

                const text = remainder_args(args);

                context.font = applyText(canvas, text);
                context.fillStyle = "#000000";
                context.fillText(text, 50, canvas.height - 50);
                
                const attachment = new MessageAttachment(canvas.toBuffer(), "generated-meme.png");

                msg.channel.send("Here's your new meme:", attachment);
            }
            break;
        case "status":
            error(msg, "Status can not be changed: Only premium users can change their bots status message.", ".status <status>");
            break;
        case "say":
            if (args[1] == "" || args[1] == null) {
                msg.reply("Sorry, I was unable to say that. This command can be used by typing .say <message>");
            } else {
                msg.channel.send(remainder_args(args));
            }
            break;
        case "invite":
            msg.reply("My Invite URL is `https://discord.com/api/oauth2/authorize?client_id=860907748693377034&scope=bot`")
            break;
        case "afk":
            const embed = new MessageEmbed()
                .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                .setColor(0x2ecc71)
                .setDescription(":white_check_mark: AFK Status set with message: This user is currently AFK.\n\n`Type .afk to remove afk status`")
                .setFooter("Created with BotGhost - https://botghost.com/");
            
            msg.channel.send(embed);
            break;
        case "warn":
            if (!msg.mentions.users.first()) {
                error(msg, "Incorrect Usage of command: Missing Components", ".warn <@target> <reason>");
            } else {
                var arr = args;
                arr.splice(0, 2);
                warn(msg, msg.mentions.users.first(), (arr.join(" ") == "" || arr.join(" ") == null) ? "No reason provided" : arr.join(" "));
            }
            break;
        case "warnings":
            if (!msg.mentions.users.first()) {
                error(msg, "Incorrect Usage of command: Missing Components", ".warnings <@target>");
            } else {
                const embed = new MessageEmbed()
                    .setTitle("Warnings for " + msg.author.username)
                    .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                    .setColor(0x3498db)
                    .setFooter("Created with BotGhost - https://botghost.com/");
                
                msg.channel.send(embed);
            }
            break;
        case "clearwarnings":
            if (!msg.mentions.users.first()) {
                error(msg, "Incorrect Usage of command: Missing Components", ".clearwarnings <@target>");
            } else {
                const user = msg.mentions.users.first();

                var embed2 = new MessageEmbed()
                    .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                    .setColor(0x2ecc71)
                    .setDescription(user.toString() + " warnings cleared by " + msg.author.toString() + ".");

                msg.channel.send(embed2);

                mod_log(msg);

                embed2
                    .setAuthor("", null)
                    .setColor(0x3498db)
                    .setDescription(user.toString() + " warnings cleared by " + msg.author.toString() + ".")
                    .setFooter("Moderation");

                msg.guild.channels.cache.find(i => i.name === "mod-logs").send(embed2);
            }
            break;
        case "mute":
            if (!msg.mentions.users.first()) {
                error(msg, "Incorrect Usage of command: Missing Components", ".mute <@target>");
            } else {
                mute(msg);

                const user = msg.mentions.users.first();

                var role = msg.guild.roles.cache.find(a => a.name === "Muted");

                user.roles.add(role);

                const embed1 = new MessageEmbed()
                    .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                    .setColor(0x2ecc71)
                    .setDescription(":white_check_mark: " + user.toString() + " was muted by " + msg.author.toString() + ".")
                    .setFooter("Created with BotGhost - https://botghost.com/");

                msg.channel.send(embed1);

                mod_log(msg);

                embed1 = new MessageEmbed()
                    .setColor(0x3498db)
                    .setDescription(user.toString() + " was muted by " + msg.author.toString() + ".")
                    .setFooter("Moderation");

                msg.guild.channels.cache.find(i => i.name === "mod-logs").send(embed1);
            }
            break;
        case "help":
            if (args[1] == "levels") {
                const embed = new MessageEmbed()
                    .setTitle("Levels Commands")
                    .setThumbnail(pfp)
                    .setColor("0xff0000")
                    .addFields(
                        { name: "`.level`", value: "Displays your current level, rank and experience." },
                        { name: "`.level`", value: "Your servers level leaderboard." }
                    );
                
                msg.channel.send(embed);
            } else if (args[1] == "memes") {
                const embed = new MessageEmbed()
                    .setTitle("Meme Commands")
                    .setThumbnail(pfp)
                    .setColor(0xff0000)
                    .addFields(
                        { name: "`.memes`", value: "Returns a list of meme templates." },
                        { name: "`.create_meme <message>`", value: "Creates a meme from the supplied message" }
                    );
                
                msg.channel.send(embed);
            } else if (args[1] == "commands") {
                const embed = new MessageEmbed()
                    .setTitle("Custom Commands")
                    .setThumbnail(pfp)
                    .setColor(0xff0000)
                    .addFields(
                        { name: "`.poo`", value: "farts" },
                        { name: "`.TheYule`", value: "The Yule!" },
                        { name: "`.spamping`", value: "pings" },
                        { name: "`.NullifiedEncryptor`", value: "Nullified Encryptor" },
                        { name: "`.channel`", value: "my channel" },
                        { name: "`.gayboy`", value: "Says the gay boy name" }
                    );
                
                msg.channel.send(embed);
            } else if (args[1] == "mod") {
                const embed = new MessageEmbed()
                    .setTitle("Moderation Commands")
                    .setThumbnail(pfp)
                    .setColor(0xff0000)
                    .addFields(
                        { name: "`.ban <@user> <reason>`", value: "Bans a member from the server." },
                        { name: "`.help`", value: "Displays all the commands of the server." },
                        { name: "`.mute <@user>`", value: "Mutes a user in the server." },
                        { name: "`.unmute <@user>`", value: "Unmutes a user in the server." },
                        { name: "`.afk`", value: "Set's an AFK message for a user." },
                        { name: "`.warn <@user>`", value: "Warns a user." },
                        { name: "`.warnings <@user>`", value: "Displays all the past warnings of a user." },
                        { name: "`.clearwarnings`", value: "Clears all the warnings of a user." },
                        { name: "`.status`", value: "Changes the status of the bot." },
                        { name: "`.report <@user> <option reason>`", value: "Reports a user." },
                        { name: "`.suggest <suggestion>`", value: "Logs a suggestion to the server." },
                        { name: "`.invite`", value: "Generates the invite link for the bot." },
                        { name: "`.kick <@user>`", value: "Kicks a user from the server." },
                        { name: "`.say <message>`", value: "Broadcasts a message in the channel." },
                        { name: "`.addrole <@user> <role>`", value: "Adds a role to a User." },
                        { name: "`.removerole`", value: "Removes a role from a User" },
                        { name: "`.softban <@user> <reason>`", value: "Soft bans a user from the server." },
                        { name: "`.purge <no. of messages>`", value: "Deletes a number of messages in a channel." },
                        { name: "`.ping`", value: "Gets the ping of the server and bot." }
                    );
                
                msg.channel.send(embed);
            } else if (args[1] != "" && args[1] != null) {
                const embed = new MessageEmbed()
                    .setThumbnail(pfp)
                    .setColor(0xff0000);
                
                msg.channel.send(embed);
            } else {
                const embed = new MessageEmbed()
                    .setTitle("HotBot3%4k Commands")
                    .setThumbnail(pfp)
                    .setColor(0xff0000)
                    .addFields(
                        { name: "Moderation", value: "`.help mod`", inline: true },
                        { name: "Levels", value: "`.help levels`", inline: true },
                        { name: "Commands", value: "`.help commands`", inline: true },
                        { name: "Meme Creator", value: "`.help memes`", inline: true }
                    );
                
                msg.channel.send(embed);
            }
            break;
    }
}

module.exports.execute = (command, msg) => {
    return execute(command, msg);
};