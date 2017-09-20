var shell = require('shelljs')

if(shell.exec('node lib/example.js').code != 0) {
  shell.exit(1)
}