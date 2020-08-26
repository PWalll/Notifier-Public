const fs = require("fs");
const gmail = require("./my_modules/gmail.js");
const calendar = require("./my_modules/calendar.js");
const htmlToText = require('html-to-text');
const Discord = require("discord.js");
const secrets = require("./secrets.json")
const client = new Discord.Client();
var ready;

if (!fs.existsSync('lastid.txt')) {fs.writeFileSync('lastid.txt', " ");}

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

function lastid() {
	return fs.readFileSync('lastid.txt','utf8');
};

function sendtodiscord(text) {
	secrets.IDs.forEach(function(id) {
		plaze = secrets.IDs.indexOf(id)
		embed = new Discord.MessageEmbed().setTitle(`New Email`).setDescription(text).setColor(7785669).setTimestamp();
		client.users.cache.get(id).send(embed);
	});
};


function checkmessage(info) {
	if (ready == 1) {
		let text = htmlToText.fromString(info.html, {wordwrap: 130});
		let id = info.id
		if (id != lastid()) {
			process.stdout.write(`[${timenow()}] ${info.snippet}\n`);
			sendtodiscord(text);
		};
		fs.writeFileSync('lastid.txt', id);
	};
};

client.login(secrets.discordtoken);

client.once('ready', () => {
	console.log('Ready!');
	ready = 1;
});

start();

setInterval(function(){
    start();
}, 30000);