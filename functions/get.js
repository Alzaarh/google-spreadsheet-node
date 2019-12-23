const { promisify } = require('util');
const chalk = require('chalk');
const GoogleSpreadSheet = require('google-spreadsheet');

const credentials = require('../credentials');

const sheet = new GoogleSpreadSheet('1y_M9NOOFGfcST45iqRxSkPitUq7strWHRh-NqMP4Oqs');

function drawUser(user) {
    console.log(`${chalk.yellow('name: ')}${chalk.white(user.name)}`);

    console.log(`${chalk.yellow('email: ')}${chalk.white(user.email)}`);

    console.log(`${chalk.yellow('password: ')}${chalk.white(user.password)}`);

    console.log(`${chalk.yellow('age: ')}${chalk.white(user.age)}`);

    console.log(`${chalk.yellow('score: ')}${chalk.white(user.score)}`);

    console.log(chalk.red('-----------------------------------------------------'));
}

async function getUser(email) {
    await promisify(sheet.useServiceAccountAuth)(credentials);

    const info = await promisify(sheet.getInfo)();

    const users = await promisify(info.worksheets[0].getRows)();

    users.forEach(function (user) {
        if (user.email === email) {
            drawUser(user);

            return;
        }
    });
}

module.exports = getUser;
