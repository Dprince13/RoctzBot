const Discord = require('discord.js');
const botSettings = require("./botsettings.json")
const prefix = botSettings.prefix;
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const delay = require('delay');								
const PREFIX = '!';											
const guild = bot.guilds.id;

bot.on('ready', async () => {
	console.log('This this bot is online!');
	
	try {
		let link = await bot.generateInvite(["ADMINISTRATOR"]);									//Generates a url to add bot to a server and prints to console.
		console.log(link);
	}catch(e) {
		console.log(e.stack);
	}
});

bot.on("message", async message => {
	if(message.author.bot) return;																//Will not listen to other bots
	if(message.channel.type === "dm") return;													//will not listen to dm channel

	let messageArray = message.content.split(" ");												//Creates array with message contents
	let command = messageArray[0];																//Creates var for the first arg of the message array
	let args = messageArray.slice(1);											

	if(!command.startsWith(prefix)) return;														//If command doesnt start with ! then do nothing

	if(command === `${prefix}agree`) {															//Creating command !agree
		var input = message.content.split(" ");
		var member = message.author.username
		// console.log(messageArray);
		
		if(input[1] === undefined) {															//DM error msg if no nickname is given
			message.delete(1000);
			message.author.send("You may only reply with !agree <In-game Username> in this channel!")
			return
		}	

		if(input[0] === "!agree") {
					
			let embed = new Discord.RichEmbed()													//Creates embed for the return data to log channel
					.setAuthor(message.author.username)
			 		.setDescription("This user has accepted Yeets Rules!")
			 		.setColor("#ffa500")
			 		.addField("Full Discord Username", `${message.author.username}#${message.author.discriminator}`)
			 		.addField("ID", message.author.id)
					.addField("Created At", message.author.createdAt)
					.addField("Main Ingame Character", messageArray[1]);

			var role = message.guild.roles.find(r => r.name === 'Accepted Rules');				//Finds the Role to set
			message.delete(3000);																//deletes last message after 3 seconds
			message.author.send("Thank you, an admin will be with you shortly!");				//Sends DM to user
			message.guild.channels.find(channel => channel.name === 'join-log').send(embed);
			function changeNick() {
				message.member.setNickname(input[1]);
				console.log('I have changed their nickname to ' + input[1]);
			}			
			function changeRole() {
				message.member.addRole(role.id);
				console.log('I have set their role to' + role);
			}
		};

		console.log(messageArray);
		setTimeout(changeNick,1000);
		
		setTimeout(changeRole,1200);	
							
	}
	
});

bot.login(botSettings.token);																	//Starts bot with correct token