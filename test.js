const fs = require("fs");
const gmail = require("./my_modules/gmail.js");
const calendar = require("./my_modules/calendar.js");

async function main() {
	console.log(await gmail.TestingApi());
}

main();