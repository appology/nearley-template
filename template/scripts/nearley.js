const shell = require('shelljs')

if(shell.exec('node node_modules/nearley/bin/nearleyc.js src/grammar.ne > src/grammar.js --color=always').code != 0) {
  shell.exit(1)
}

if(shell.mkdir('-p', 'lib').code != 0) {
  shell.exit(1)
}

if(shell.cp('-rf', 'src/grammar.js', 'lib').code != 0) {
  shell.exit(1)
}