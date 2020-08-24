const { google } = require("googleapis");
const { base64decode } = require('nodejs-base64');
const gapi = require("./gapi.js");
module.exports = {
	async ListLastEmail() {
		const auth = await gapi.getAuth();
		const userId = "me";
		const query = "label:lossauces";
		const gmail = google.gmail({ version: "v1", auth });
		const list = await gmail.users.messages.list({ userId: userId, q: query });
		const id = list.data.messages[0].id;
		const email = await gmail.users.messages.get({ userId: userId, id: id });
		const html = base64decode(email.data.payload.body.data);
		await new Promise(resolve => setTimeout(resolve, 500));
		const info = {
			html: html,
			id: email.data.id
		}
		return info;
	}
}