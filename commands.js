const bot = require("./hotguy");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const Canvas = require("canvas");

const remainder_args = args => { var arr = args; return arr.slice(1).join(" "); }

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

const report_log = msg => {
    if (msg.guild.channels.cache.find(i => i.name === "reports")) {
        return;
    } else {
        msg.guild.channels.create("reports", {
            type: "text",
            permissionOverwrites: [{
                id: msg.guild.id,
                allow: ["VIEW_CHANNEL"],
                deny: ["SEND_MESSAGES"]
            }]
        });
    }
}

const suggestion_log = msg => {
    if (msg.guild.channels.cache.find(i => i.name === "suggestions")) {
        return;
    } else {
        msg.guild.channels.create("suggestions", {
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

module.exports.execute = async (data, msg) => {
    const args = data.trim().split(/ +/);
    const command = args[0];

    var embed;
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
        case "ep1":
            msg.channel.send("https://www.youtube.com/watch?v=Z3pAC9B95ew");
            break;
        case "burnyule":
            msg.channel.send("https://www.youtube.com/watch?v=5f2XLW2mHcI");
            break;
        case "disstrack":
            msg.channel.send("https://www.youtube.com/watch?v=Rlp2b3OZycg");
            break;
        case "gayerboy":
            msg.channel.send("HOTGUY4%HD IS THE GAYER BOY");
            break;
        case "gayestboy":
            msg.channel.send("HotGuy4%HD is The Gayest Boy!");
            break;
        case "memes":
            embed = new MessageEmbed()
                .setTitle("Meme Id's")
                .setColor("gray")
                .addFields(
                    { name: "How to create a meme", value: "First choose a template from below and copy its `#ID` and note its required `[captions]`. Next run `.create_meme <id> <first caption, second caption> ` with the correct number of [captions] seperated by commas." },
                    { name: "Template IDs", value: "Error:\n`Unable to fetch templates. ERR_NO_TEMPLATES 0x2763h279s632`" }
                );
            
            msg.channel.send(embed);
            break;
        case "create_meme":
            if (!parseInt(args[1]) || args[2] == "" || args[2] == null) {
                error(msg, "Command is missing components", ".create_meme <id> <message>");
            } else {
                const canvas = Canvas.createCanvas(800, 450);
                const context = canvas.getContext("2d");

                var path;
                var color = "#000000";

                switch (parseInt(args[1])) {
                    case 1:
                        path = "meme";
                        break;
                    case 2:
                        path = "meme2";
                        break;
                    case 3:
                        path = "meme3";
                        break;
                    case 4:
                        path = "meme4"
                        break;
                    case 5:
                        path = "meme5";
                        color = "#ffffff";
                        break;
                    default:
                        path = "meme";
                        break;
                }

                const background = await Canvas.loadImage("./stock/" + path + ".png");
                context.drawImage(background, 0, 0, canvas.width, canvas.height);

                const text = args.slice(2).join(" ");

                context.font = applyText(canvas, text);
                context.fillStyle = color;
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
            embed = new MessageEmbed()
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
                var reason = args.slice(2).join(" ");
                var result = (reason == "" || reason == null) ? "No reason provided" : reason;
                warn(msg, msg.mentions.users.first(), result);
            }
            break;
        case "warnings":
            if (!msg.mentions.users.first()) {
                error(msg, "Incorrect Usage of command: Missing Components", ".warnings <@target>");
            } else {
                embed = new MessageEmbed()
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

                embed = new MessageEmbed()
                    .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                    .setColor(0x2ecc71)
                    .setDescription(user.toString() + " warnings cleared by " + msg.author.toString() + ".");

                msg.channel.send(embed);

                mod_log(msg);

                embed = new MessageEmbed()
                    .setColor(0x3498db)
                    .setDescription(user.toString() + " warnings cleared by " + msg.author.toString() + ".")
                    .setFooter("Moderation");

                msg.guild.channels.cache.find(i => i.name === "mod-logs").send(embed);
            }
            break;
        case "mute":
            if (!msg.guild.member(msg.author).hasPermission("MANAGE_ROLES") || !msg.guild.me.hasPermission("MANAGE_ROLES")) return;

            if (!msg.mentions.users.first()) {
                error(msg, "Incorrect Usage of command: Missing Components", ".mute <@target>");
            } else {
                mute(msg);

                const user = msg.mentions.members.first();

                let role = msg.guild.roles.cache.find(x => x.name == "Muted");
                user.roles.add(role);

                embed = new MessageEmbed()
                    .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                    .setColor(0x2ecc71)
                    .setDescription(":white_check_mark: " + user.toString() + " was muted by " + msg.author.toString() + ".")
                    .setFooter("Created with BotGhost - https://botghost.com/");

                msg.channel.send(embed);

                mod_log(msg);

                embed = new MessageEmbed()
                    .setColor(0x3498db)
                    .setDescription(user.toString() + " was muted by " + msg.author.toString() + ".")
                    .setFooter("Moderation");

                msg.guild.channels.cache.find(i => i.name === "mod-logs").send(embed);
            }
            break;
        case "unmute":
            if (!msg.guild.member(msg.author).hasPermission("MANAGE_ROLES") || !msg.guild.me.hasPermission("MANAGE_ROLES")) return;

            if (!msg.mentions.users.first()) {
                error(msg, "Incorrect Usage of command: Missing Components", ".unmute <@target>");
            } else {
                mute(msg);

                const user = msg.mentions.members.first();

                let role = msg.guild.roles.cache.find(x => x.name == "Muted");
                if (user.roles.cache.has(role.Id)) {
                    user.roles.remove(role);

                    embed = new MessageEmbed()
                        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                        .setColor(0x2ecc71)
                        .setDescription(":white_check_mark: " + user.toString() + " was unmuted by " + msg.author.toString() + ".")
                        .setFooter("Created with BotGhost - https://botghost.com/");

                    msg.channel.send(embed);

                    mod_log(msg);

                    embed = new MessageEmbed()
                        .setColor(0x3498db)
                        .setDescription(user.toString() + " was unmuted by " + msg.author.toString() + ".")
                        .setFooter("Moderation");

                    msg.guild.channels.cache.find(i => i.name === "mod-logs").send(embed);
                }

                // error(msg, "Mute Failed: Unable to find the role 'Muted' or the user was never muted.", ".unmute <@target>");
            }
            break;
        case "suggest":
            if (args[1] == "" || args[1] == null) {
                error(msg, "Suggestion Failed: Please include your suggestion in your command.", ".suggest <suggestion>");
            } else {
                suggestion_log(msg);

                embed = new MessageEmbed()
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
                    .setColor(0x3498db)
                    .setDescription(remainder_args(args))
                    .setFooter("Created with BotGhost - https://botghost.com/");

                msg.guild.channels.cache.find(i => i.name === "suggestions").send(embed);
            }
            break;
        case "kick":
            if (!msg.guild.member(msg.author).hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"]) || !msg.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return;

            if (!msg.mentions.users.first()) {
                error(msg, "Incorrect Usage of command: Missing Components", ".kick <@target>");
            } else {
                try {
                    const user = msg.mentions.members.first();

                    embed = new MessageEmbed()
                        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                        .setColor(0x2ecc71)
                        .setDescription(":white_check_mark: " + user.toString() + " was kicked by " + msg.author.toString() + ".")
                        .setFooter("Created with BotGhost - https://botghost.com/");

                    msg.channel.send(embed);

                    mod_log(msg);
                    
                    var reason = args.slice(2).join(" ");
                    var result = (reason == "" || reason == null) ? "Kicked by " + msg.author.tag : reason;

                    embed = new MessageEmbed()
                        .setColor(0x3498db)
                        .setDescription(user.toString() + " was kicked by " + msg.author.toString() + ". Reason: " + result)
                        .setFooter("Moderation");

                    msg.guild.channels.cache.find(i => i.name === "mod-logs").send(embed);

                    user.kick("[object Object]");
                } catch {
                    error(msg, "Kick Failed: Unknown Failure.", ".kick <@target>");
                }
            }
            break;
        case "softban":
            if (!msg.guild.member(msg.author).hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]) || !msg.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return;

            if (!msg.mentions.users.first()) {
                error(msg, "Incorrect Usage of command: Missing Components", ".softban <@target> <days> <reason>");
            } else {
                if (!parseInt(args[2])) return error(msg, "Incorrect Usage of command: Missing Components", ".softban <@target> <days> <reason>");

                try {
                    const user = msg.mentions.members.first();

                    embed = new MessageEmbed()
                        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                        .setColor(0x2ecc71)
                        .setDescription(":white_check_mark: " + user.toString() + " was soft banned by " + msg.author.toString() + " for `" + args[2] + "` days.")
                        .setFooter("Created with BotGhost - https://botghost.com/");

                    msg.channel.send(embed);

                    mod_log(msg);
                    
                    var reason = args.slice(3).join(" ");
                    var result = (reason == "" || reason == null) ? "Soft banned by " + msg.author.tag : reason;

                    embed = new MessageEmbed()
                        .setColor(0x3498db)
                        .setDescription(user.toString() + " was soft banned by " + msg.author.toString() + ". Days: `" + args[2] + "`. Reason: " + result)
                        .setFooter("Moderation");

                    msg.guild.channels.cache.find(i => i.name === "mod-logs").send(embed);

                    user.ban({ days: parseInt(args[2]), reason: result });
                } catch {
                    error(msg, "Soft ban Failed: Unknown Failure.", ".softban <@target> <days> <reason>");
                }
            }
            break;
        case "ban":
            if (!msg.guild.member(msg.author).hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]) || !msg.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return;

            if (!msg.mentions.users.first()) {
                error(msg, "Incorrect Usage of command: Missing Components", ".ban <@target>");
            } else {
                try {
                    const user = msg.mentions.members.first();

                    embed = new MessageEmbed()
                        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                        .setColor(0x2ecc71)
                        .setDescription(":white_check_mark: " + user.toString() + " was banned by " + msg.author.toString() + ".")
                        .setFooter("Created with BotGhost - https://botghost.com/");

                    msg.channel.send(embed);

                    mod_log(msg);
                    
                    var reason = args.slice(2).join(" ");
                    var result = (reason == "" || reason == null) ? "Banned by " + msg.author.tag : reason;

                    embed = new MessageEmbed()
                        .setColor(0x3498db)
                        .setDescription(user.toString() + " was banned by " + msg.author.toString() + ". Reason: " + result)
                        .setFooter("Moderation");

                    msg.guild.channels.cache.find(i => i.name === "mod-logs").send(embed);

                    user.ban({ reason: result });
                } catch {
                    error(msg, "Ban Failed: Unknown Failure.", ".ban <@target>");
                }
            }
            break;
        case "addrole":
            if (!msg.guild.member(msg.author).hasPermission("MANAGE_ROLES") || !msg.guild.me.hasPermission("MANAGE_ROLES")) return;

            if (!msg.mentions.users.first()) {
                error(msg, "Incorrect Usage of command: Missing Components", ".addrole <@target> <role>");
            } else {
                if (args[2] == "undefined") {
                    error(msg, "Incorrect Usage of command: Missing Components", ".addrole <@target> <role>");
                } else {
                    try {
                        const user = msg.mentions.members.first();
    
                        let role = msg.guild.roles.cache.find(x => x.name == args[2]);
                        user.roles.add(role);
    
                        embed = new MessageEmbed()
                            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                            .setColor(0x2ecc71)
                            .setDescription(":white_check_mark: Added role `" + args[2] + "` to " + user.toString())
                            .setFooter("Created with BotGhost - https://botghost.com/");
    
                        msg.channel.send(embed);
    
                        mod_log(msg);
    
                        embed = new MessageEmbed()
                            .setColor(0x3498db)
                            .setDescription(msg.author.toString() + " added role `" + args[2] + "` to " + user.toString())
                            .setFooter("Moderation");
    
                        msg.guild.channels.cache.find(i => i.name === "mod-logs").send(embed);
                    } catch {
                        error(msg, "Error: Could not add the role to the user.", ".addrole <@target> <role>");
                    }
                }
            }
            break;
        case "removerole":
            if (!msg.guild.member(msg.author).hasPermission("MANAGE_ROLES") || !msg.guild.me.hasPermission("MANAGE_ROLES")) return;

            if (!msg.mentions.users.first()) {
                error(msg, "Incorrect Usage of command: Missing Components", ".removerole <@target> <role>");
            } else {
                if (args[2] == "undefined") {
                    error(msg, "Incorrect Usage of command: Missing Components", ".removerole <@target> <role>");
                } else {
                    try {
                        const user = msg.mentions.members.first();
    
                        let role = msg.guild.roles.cache.find(x => x.name == args[2]);
                        user.roles.add(role);
    
                        embed = new MessageEmbed()
                            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                            .setColor(0x2ecc71)
                            .setDescription(":white_check_mark: Remove role `" + args[2] + "` from " + user.toString())
                            .setFooter("Created with BotGhost - https://botghost.com/");
    
                        msg.channel.send(embed);
    
                        mod_log(msg);
    
                        embed = new MessageEmbed()
                            .setColor(0x3498db)
                            .setDescription(msg.author.toString() + " removed role `" + args[2] + "` from " + user.toString())
                            .setFooter("Moderation");
    
                        msg.guild.channels.cache.find(i => i.name === "mod-logs").send(embed);
                    } catch {
                        error(msg, "Error: Could not add the role to the user.", ".removerole <@target> <role>");
                    }
                }
            }
            break;
        case "report":
            if (!msg.mentions.users.first()) {
                error(msg, "Report Failed: Please @ another member to report.", ".report <@target> <optional message>");
            } else {
                report_log(msg);

                const user = msg.mentions.members.first();

                var reason___ = args.slice(2).join(" ");
                var result = (reason___ == "" || reason___ == null) ? "" : "\nReason: " + reason___;

                embed = new MessageEmbed()
                    .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                    .setColor(0x3498db)
                    .setDescription("**New report against** " + user.toString() + "\n\nBy:" + msg.author.toString() + "\nLast message: " + user.lastMessage.content + result)
                    .setFooter("Created with BotGhost - https://botghost.com/");

                msg.guild.channels.cache.find(i => i.name === "reports").send(embed);

                msg.reply("Report Received!");
            }
            break;
        case "purge":
            if (!msg.guild.member(msg.author).hasPermission("MANAGE_MESSAGES") || !msg.guild.me.hasPermission("MANAGE_MESSAGES")) return;

            if (args[1] == "" || args[1] == null) {
                error(msg, "Incorrect Usage of Command: Missing Components", ".purge <number of messages to delete>");
            } else {
                if (!parseInt(args[1])) {
                    error(msg, "Incorrect Usage of Command: Missing Components", ".purge <number of messages to delete>");
                } else {
                    msg.channel.bulkDelete(parseInt(args[1]), true).catch(() => {
                        error(msg, "Something went wrong when purging this channel.", ".purge <number of messages to delete>");
                    });

                    embed = new MessageEmbed()
                        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                        .setColor(0x2ecc71)
                        .setDescription(":white_check_mark: Successfully purged " + args[1] + " messages.")
                        .setFooter("Created with BotGhost - https://botghost.com/");

                    msg.channel.send(embed);

                    mod_log(msg);
    
                    embed = new MessageEmbed()
                        .setColor(0x3498db)
                        .setDescription(msg.author.toString() + " purged " + args[1] + " messages from " + msg.channel.name)
                        .setFooter("Moderation");

                    msg.guild.channels.cache.find(i => i.name === "mod-logs").send(embed);
                }
            }
            break;
        case "help":
            if (args[1] == "levels") {
                embed = new MessageEmbed()
                    .setTitle("Levels Commands")
                    .setThumbnail(pfp)
                    .setColor("0xff0000")
                    .addFields(
                        { name: "`.level`", value: "Displays your current level, rank and experience." },
                        { name: "`.level`", value: "Your servers level leaderboard." }
                    );
                
                msg.channel.send(embed);
            } else if (args[1] == "memes") {
                embed = new MessageEmbed()
                    .setTitle("Meme Commands")
                    .setThumbnail(pfp)
                    .setColor(0xff0000)
                    .addFields(
                        { name: "`.memes`", value: "Returns a list of meme templates." },
                        { name: "`.create_meme <id> <message>`", value: "Creates a meme from the supplied id and message" }
                    );
                
                msg.channel.send(embed);
            } else if (args[1] == "commands") {
                embed = new MessageEmbed()
                    .setTitle("Custom Commands")
                    .setThumbnail(pfp)
                    .setColor(0xff0000)
                    .addFields(
                        { name: "`.poo`", value: "farts" },
                        { name: "`.TheYule`", value: "The Yule!" },
                        { name: "`.spamping`", value: "pings" },
                        { name: "`.NullifiedEncryptor`", value: "Nullified Encryptor" },
                        { name: "`.channel`", value: "my channel" },
                        { name: "`.gayboy`", value: "Says the gay boy name" },
                        { name: "`.ep1`", value: "episode 1" },
                        { name: "`.burnyule`", value: "burn HotGuy4%HD" },
                        { name: "`.disstrack`", value: "HotGuy4%HD Diss track" },
                        { name: "`.gayerboy`", value: "Gayer Boy" },
                        { name: "`.gayestboy`", value: "Gayest Boy" }
                    );
                
                msg.channel.send(embed);
            } else if (args[1] == "mod") {
                embed = new MessageEmbed()
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
                embed = new MessageEmbed()
                    .setThumbnail(pfp)
                    .setColor(0xff0000);
                
                msg.channel.send(embed);
            } else {
                embed = new MessageEmbed()
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
};