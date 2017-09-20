const shell = require('shelljs')

// don't error if file(s) do(es) not exist...
shell.rm('-rf', 'lib', 'src/grammar.js')