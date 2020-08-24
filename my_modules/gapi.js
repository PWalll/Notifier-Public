const fs = require("fs");
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly", "https://www.googleapis.com/auth/calendar"];
const TOKEN_PATH = "token.json";
const readline = require("readline");
const { google } = require("googleapis");

async function authorize(credentials, callback) {
	const { client_secret, client_id, redirect_uris } = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(
		client_id,
		client_secret,
		redirect_uris[0]
	);
	if (fs.existsSync(TOKEN_PATH)) {
		token = fs.readFileSync(TOKEN_PATH);
		oAuth2Client.setCredentials(JSON.parse(token));
		return oAuth2Client;
	} else return await getNewToken(oAuth2Client, callback);
}

async function getNewToken(oAuth2Client, callback) {
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
		fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
			if (err) return console.error(err);
			console.log("Token stored to", TOKEN_PATH);
		});
		callback(oAuth2Client);
		});
	});
}

module.exports = {
	getAuth() {
		var creds = fs.readFileSync("credentials.json");
		return authorize(JSON.parse(creds));
	}
}