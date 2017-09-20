const zipper = require('zip-local')
const shell = require('shelljs')

if(shell.exec('npm run clean').code != 0) {
  shell.exit(1)
}

zipper.sync.zip("./template/").compress().save("template.zip");