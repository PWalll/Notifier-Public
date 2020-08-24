const fs = require("fs");
const gmail = require("./my_modules/gmail.js");
const calendar = require("./my_modules/calendar.js");
const htmlToText = require('html-to-text');
const Discord = require("discord.js");
const secrets = require("./secrets.json")
const client = new Discord.Client();
const label = "";
var ready;

if (!fs.existsSync('lastemail.txt')) {fs.writeFileSync('lastemail.txt', " ");}

async function start() {
	var info = await gmail.ListLastEmail();
	checkmessage(info);
}

function timenow() {
	let unix_timestamp = new Date().getTime();
	var date = new Date(unix_timestamp);
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();
	return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
};

function lastemail() {
	return fs.readFileSync('lastemail.txt','utf8');
};

function sendtodiscord(url,info, text) {
	secrets.IDs.forEach(function(id) {
		plaze = secrets.IDs.indexOf(id)
		embed = new Discord.MessageEmbed().setTitle(`Nuevo: ${info}`).setURL(url.replace('&person=14541', `&person=${secrets.PhidiasID[plaze]}`)).setDescription(text).setColor(7785669).setTimestamp();
		client.users.cache.get(id).send(embed);
	});
};


function checkmessage(info) {
	
	if (ready == 1) {
		let text = htmlToText.fromString(html, {wordwrap: 130});
		if (rmnumber != 0) {
			urlextracter(html);
			if (url != lasturl()) {
				process.stdout.write(`[${timenow()}] ${text}\n`);
				sendtodiscord(url, info, text);
			};
		};
		fs.writeFileSync('lasturl.txt', url);
	};
};

/*client.login(secrets.discordtoken);

client.once('ready', () => {
	console.log('Ready!');
	ready = 1;
});

start();

setInterval(function(){
    start();
}, 30000);*/
async function test() {
	console.log(await gmail.ListLastEmail())
}
test()