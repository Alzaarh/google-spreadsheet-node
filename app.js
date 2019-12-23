#!/usr/bin/env node

const chalk = require('chalk');
const argv = require('yargs').argv;
const getAll = require('./functions/get-all');
const get = require('./functions/get');
const add = require('./functions/add');

switch (argv._[0]) {
    case 'get-all':
        getAll();

        break;

    case 'get':
        get(argv.email);

        break;

    case 'add':
        add(argv.name, argv.email, argv.password, argv.age, argv.score);

        break;

    default:
        console.log(chalk.red('invalid argument'));
}
