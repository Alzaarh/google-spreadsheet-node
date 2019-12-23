const { promisify } = require('util');
const chalk = require('chalk');
const GoogleSpreadSheet = require('google-spreadsheet');

const credentials = require('../credentials');

const sheet = new GoogleSpreadSheet('1y_M9NOOFGfcST45iqRxSkPitUq7strWHRh-NqMP4Oqs');

async function addUser(name, email, password, age, score) {
    if (name && email && password && age && score) {
        const row = {
            name,
            email,
            password,
            age,
            score,
        };

        await promisify(sheet.useServiceAccountAuth)(credentials);

        const info = await promisify(sheet.getInfo)();

        const users = await promisify(info.worksheets[0].addRow)(row);

        console.log(chalk.green('user successfuly added!'));
    } else {
        console.log(chalk.red('invalid input!'));
    }    
}

module.exports = addUser;
