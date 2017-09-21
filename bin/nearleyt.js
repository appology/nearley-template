#!/usr/bin/env node

const path = require("path")
const fs = require('fs')
const readline = require('readline')
const shell = require('shelljs')
const zipper = require('zip-local')
const ora = require('ora')

var command = process.argv[2];
if (command === 'init') {
  // check if directory exists
  const spinner = ora('Checking current directory...').start()
  var files = fs.readdir('./', (err, files) => {
    setTimeout(() => {
      if (files.length > 0) {
        spinner.fail("Current directory is not empty.")
        shell.exit(1)
      }
      spinner.succeed('Current directory is ready for initialization.')
      spinner.stop();

      // gather information
      var info = {}

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      const default_package_name = path.basename(process.cwd())
      const default_package_description = 'A grammar and stream-friendly parser.';
      const default_package_license = 'MIT';
      rl.question(`package name: (${default_package_name}) `, package_name => {
        rl.question('package version: (0.0.1) ', package_version => {
          rl.question(`package description: (${default_package_description}) `, package_description => {
            rl.question(`package license: (${default_package_license}) `, package_license => {
              rl.question('github username: ', github_username => {
                rl.question(`github repo: (${default_package_name}) `, github_repo => {
                  rl.close()
                  info.package_name = package_name.trim() || default_package_name
                  info.package_version = package_version.trim() || '0.0.1'
                  info.package_description = package_description.trim() || default_package_description
                  info.package_license = package_license.trim() || default_package_license
                  info.github_username = github_username.trim() || '{GITHUB_USERNAME}'
                  info.github_repo = github_repo.trim() || default_package_name

                  // copy files
                  spinner.start('Copying template...')
                  zipper.sync.unzip(path.join(__dirname, '../template.zip')).save(".");
                  spinner.succeed('Template copied.')

                  // patch files (e.g. package.json with project_name, project_description, etc.)
                  spinner.start('Patching template...')
                  var files = ['package.json', 'README.md']
                  Object.keys(info).forEach(i => {
                    shell.sed('-i', i, info[i], files)
                  })
                  spinner.succeed('Template patched.')

                  // // npm i
                  // spinner.start('Installing dependencies...')
                  // if (shell.exec('npm i').toEnd('nearleyt.log').code != 0) {
                  //   spinner.fail('Dependency installation failed. Check nearleyt.log for details.')
                  //   shell.exit(1)
                  // }
                  // spinner.succeed('Dependencies installed.')

                  // // npm test
                  // spinner.text = 'Running tests...'
                  // if (shell.exec('npm test').toEnd('nearleyt.log').code != 0) {
                  //   spinner.fail('Unable to run tests, or some tests failed. Check nearleyt.log for details.')
                  //   shell.exit(1)
                  // }
                  // spinner.succeed('Tests passed!')

                  // display completed message
                  shell.echo('Template generation complete!')
                  shell.echo('Run `npm i && npm test` to ensure everything went well.')
                })
              })
            })
          })
        })
      })
    }, 1500)
  });
} else {
  shell.echo('The only currently supported command is \'nearleyt init\'')
}