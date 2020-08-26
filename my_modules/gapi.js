const fs = require("fs");
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly", "https://www.googleapis.com/auth/calendar"];
const TOKEN_PATH = "token.json";
const readline = require("readline");
const readlinesync = require("readline-sync");
const { google } = require("googleapis");

async function authorize(credentials) {
	const { client_secret, client_id, redirect_uris } = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(
		client_id,
		client_secret,
		redirect_uris[0]
	);
	if (fs.existsSync(TOKEN_PATH)) {
		const token = fs.readFileSync(TOKEN_PATH);
		oAuth2Client.setCredentials(JSON.parse(token));
		return oAuth2Client;
	} else return await test(oAuth2Client);
};

async function test(oAuth2Client) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: "offline",
		scope: SCOPES,
	});
	console.log("Authorize this app by visiting this url:", authUrl);
	const code = readlinesync.question("Enter the code from that page here: ");
	const { tokens } = await oAuth2Client.getToken(code);
	getNewToken(oAuth2Client, tokens)
};

function getNewToken(oAuth2Client, tokens) {
	console.log(tokens);
	oAuth2Client.setCredentials(tokens);
	fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
};

module.exports = {
	async getAuth() {
		var creds = fs.readFileSync("credentials.json");
		return authorize(JSON.parse(creds));
	}
};