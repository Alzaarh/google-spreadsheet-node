const { promisify } = require('util');
const GoogleSpreadSheet = require('google-spreadsheet');
const chalk = require('chalk');

const credentials = require('../credentials');

const sheet = new GoogleSpreadSheet('1y_M9NOOFGfcST45iqRxSkPitUq7strWHRh-NqMP4Oqs');

function drawUsers(users) {
    users.forEach(function (user) {        
        console.log(`${chalk.yellow('name: ')}${chalk.white(user.name)}`);

        console.log(`${chalk.yellow('email: ')}${chalk.white(user.email)}`);

        console.log(`${chalk.yellow('password: ')}${chalk.white(user.password)}`);

        console.log(`${chalk.yellow('age: ')}${chalk.white(user.age)}`);

        console.log(`${chalk.yellow('score: ')}${chalk.white(user.score)}`);

        console.log(chalk.red('-----------------------------------------------------'));
    });
}

async function getUsers() {
    await promisify(sheet.useServiceAccountAuth)(credentials);

    const info = await promisify(sheet.getInfo)();

    const users = await promisify(info.worksheets[0].getRows)();

    drawUsers(users);
}

module.exports = getUsers;