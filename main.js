const fs = require("fs");
const { google } = require("googleapis");
const { base64decode } = require('nodejs-base64');
const htmlToText = require('html-to-text');
const readline = require("readline");
const Discord = require("discord.js");
const secrets = require("./secrets.json")
const client = new Discord.Client();
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
const TOKEN_PATH = "token.json";
const label = "lossauces";
var ready;
if (!fs.existsSync('lastemail.txt')) {
	fs.writeFileSync('lastemail.txt', " ");
	console.log("File created.")
}
client.login(secrets.discordtoken);
client.once('ready', () => {
	console.log('Ready!');
	ready = 1;
});
function timenow() {
	let unix_timestamp = new Date().getTime();
	var date = new Date(unix_timestamp);
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();
	return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}
function lastemail() {
	return fs.readFileSync('lastemail.txt','utf8');
}
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
	client_id,
	client_secret,
	redirect_uris[0]
  );
  fs.readFile(TOKEN_PATH, (err, token) => {
	if (err) return getNewToken(oAuth2Client, callback);
	oAuth2Client.setCredentials(JSON.parse(token));
	callback(oAuth2Client);
  });
}
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
	access_type: "offline",
	scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
	rl.close();
	oAuth2Client.getToken(code, (err, token) => {
	  if (err) return callback(err);
	  oAuth2Client.setCredentials(token);
	  // Store the token to disk for later program executions
	  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
		if (err) return console.error(err);
		console.log("Token stored to", TOKEN_PATH);
	  });
	  callback(oAuth2Client);
	});
  });
}
function getLastEmail(auth) {
	const userId = "me";
	const query = "label:" +label;
	const gmail = google.gmail({ version: "v1", auth });
	gmail.users.messages.list({ userId: userId, q: query }, (err1, res1) => {
		if (err1) {
		console.log(err1);
		return;
		}
		const id = res1.data.messages[0].id;
		gmail.users.messages.get({ userId: userId, id: id }, (err2, res2) => {
			if (err2) {
				console.log(err2);
				return;
			}
			if (ready == 1) {
			let html = base64decode(res2.data.payload.body.data);
			sendmessage(html);
		}
		});
	});
}
function sendmessage(html) {
	const me = client.users.cache.get(secrets.MyID);
	let text = htmlToText.fromString(html, {wordwrap: 130});
	if (text != lastemail()) {
		console.log("[" +timenow() +"] " +text);
		me.send(new Discord.MessageEmbed().setTitle("New message.").setDescription(text).setColor(7785669).setTimestamp());
		fs.writeFileSync('lastemail.txt', text);		
	}
}
function start() {
	fs.readFile("credentials.json", (err, content) => {
		if (err) return console.log("Error loading client secret file:", err);
		authorize(JSON.parse(content), getLastEmail);
	});
}

start();

setInterval(function(){
    start()
}, 30000)