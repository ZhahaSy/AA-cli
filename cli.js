#! /usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');

const projectName = require('./package.json').name;


program
  .command('create <app-name>')
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    require('./lib/create.js')(name, options);
  })

// 配置config命令
program
.command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>')
  .option('-d, --delete <path>', 'delete option from config')
  .action((value, options) => {
    require('./lib/config.js')(value, options);
  })

// 配置ui命令
program
  .command('ui')
  .description('start add open aa-cli ui')
  .option('-p, --port <port>', 'Port used for the UI Server')
  .action((option) => {
    require('./lib/ui.js')(option)
  })

program
  .on('--help', () => {

    console.log('\r\n' + figlet.textSync('AA-CLI', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    }))
    console.log(`\r\n ${chalk.blue(`${projectName} <command> --help`)} for detailed usage of given command\r\n`)
  })

program
  .version(`v${require('./package.json').version}`)
  .usage('<command> [option]')

program.parse(process.argv);