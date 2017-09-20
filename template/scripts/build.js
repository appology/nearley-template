const shell = require('shelljs')

if(shell.exec('npm run nearley').code != 0) {
  shell.exit(1)
}

if(shell.exec('npm run babel').code != 0) {
  shell.exit(1)
}