const shell = require('shelljs')

if(shell.exec('ava test/**/*.js --color=always').code != 0){
  shell.exit(1)
}