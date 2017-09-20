const shell = require('shelljs')

if(shell.exec('babel src -d lib --color=always').code != 0) {
  shell.exit(1)
}