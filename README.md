# appology / nearley-template [![Build Status](https://travis-ci.org/appology/nearley-template.svg?branch=master)](https://travis-ci.org/appology/nearley-template)

Your own DSL, in javascript, in a nice reusable package!

Crafted with ♡ by Appology

Made possible by the *super awesome* [nearley](https://nearley.js.org/) parser toolkit.

## Before you install...
Please keep in mind that until this project is not yet battle tested.

## Issues?
You can submit new issues using [GitHub Issues](https://github.com/appology/nearley-template/issues)

## Install:
```bash
npm i -g nearley-template
```

## Init:
```bash
mkdir my_project && cd my_project
nearleyt init
```

After a few short questions, you'll be **ready to hack** with:
- A sample [nearley grammar](https://nearley.js.org/) that emulates a calculator
- Unit testing with [ava](https://github.com/avajs/ava)
- Modern javascript via [babel](https://babeljs.io/)
- Continuous integration via [Travis-CI](https://travis-ci.org)
- Rapid testing via [Wallaby.js](https://wallabyjs.com/)
- Watch support via [npm-watch](https://github.com/M-Zuber/npm-watch)
- Visual Studio Code support (settings.json)

### Some helpful commands:
```bash
# compile the grammar and javascript files
# under /src into /lib
npm run build

# run all tests manually
npm test

# when using a test runner like Wallaby.js,
# recompiles /src/grammar.ne as you save
npm run watch nearley
```