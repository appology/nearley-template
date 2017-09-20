#!/usr/bin/env node

const path = require("path")
const fs = require('fs')
const readline = require('readline')
const shell = require('shelljs')
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
      rl.question(`package name: (${default_package_name}) `, package_name => {
        rl.question('package version: (0.0.1) ', package_version => {
          rl.question(`package description: (${default_package_description}) `, package_description => {
            rl.question('github username: ', github_username => {
              rl.question('github repo: ', github_repo => {
                rl.close()
                info.package_name = package_name.trim() || default_package_name
                info.package_version = package_version.trim() || '0.0.1'
                info.package_description = package_description.trim() || default_package_description
                info.github_username = github_username.trim() || '{GITHUB_USERNAME}'
                info.github_repo = github_repo.trim() || '{GITHUB_REPO}'

                // copy files
                spinner.start('Copying files...')
                if (shell.exec(`cp -r ${path.join(__dirname, '../template/')} . >> nearleyt.log 2>&1`).code != 0) {
                  spinner.fail('Unable to copy template. Check nearleyt.log for details.')
                  shell.exit(1)
                }
                spinner.succeed('Files copied.')

                // patch files (e.g. package.json with project_name, project_description, etc.)
                spinner.start('Patching files...')
                var files = ['package.json', 'README.md']
                shell.sed('-i', 'package_name', info.package_name, files)
                shell.sed('-i', 'package_version', info.package_version, files)
                shell.sed('-i', 'package_description', info.package_description, files)
                shell.sed('-i', 'github_username', info.github_username, files)
                shell.sed('-i', 'github_repo', info.github_repo, files)
                spinner.succeed('Files patched.')

                // npm i
                spinner.start('Installing dependencies...')
                if (shell.exec('npm i >> nearleyt.log 2>&1').code != 0) {
                  spinner.fail('Dependency installation failed. Check nearleyt.log for details.')
                  shell.exit(1)
                }
                spinner.succeed('Dependencies installed.')

                // npm test
                spinner.text = 'Running tests...'
                if (shell.exec('npm test >> nearleyt.log 2>&1').code != 0) {
                  spinner.fail('Unable to run tests, or some tests failed. Check nearleyt.log for details.')
                  shell.exit(1)
                }
                spinner.succeed('Tests passed!')

                // display completed message
                shell.echo('Template generation complete!')
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