# Notifier-Public

Notifier-Public, is an node.js app that retrives emails from gmail, using the gmail api, then sorts it by a label and finally sends them to an array of discord ids.

## Getting Started

1.	Download the code from [here](https://github.com/PWalll/Notifier-Public/archive/master.zip).
2.	Extract the zip.
3.	Get a credentials.json of your google account. [Tutorial here](credentials.md)
4.	Place it in the directory you extracted the zip.
5.	Open a terminal and get into that directory.
6.	Run `npm install` to install the dependencies of the project.
7.	Copy or change the name of the `secrets.json.example` to secrets.json, and fill the necesary fields.
8.	Then, run `node main.js`.
9. 	You will be prompted with an url, you go to it sing in with your google account.
10.	Then you will get a warning screen with the name of the project of the credentials.json.
11.	You go to advanced and then get into `Go to (name of the project)`
12. Then you will get prompted with some scopes, to this project to work at it minum funcionality you have to allow the read only of gmail.
13. You will get a token, paste it in the terminal and then hit enter.
14. You are ready to go.

### Prerequisites

```
Node.JS
Discord
Discord Application
```

Node.JS download [page](https://nodejs.org/en/download/).
How to install Node.JS on windows [here](https://phoenixnap.com/kb/install-node-js-npm-on-windows).
How to get Discord Application and bot token [here]{https://www.writebots.com/discord-bot-token/}.
### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Built With

* [NodeJS](https://nodejs.org/dist/latest-v12.x/docs/api/) - The web framework used
* [NPM](https://www.npmjs.com/) - Dependency Management

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Author

* **PWall** - *Initial work* - [PWall](https://github.com/PWalll)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to [PurpleBooth](https://github.com/PurpleBooth), for doing a README.md template.