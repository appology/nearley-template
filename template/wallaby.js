module.exports = function (wallaby) {
  return {
    files: [
      {pattern: 'src/**/*.js'}
    ],

    tests: [
      {pattern: 'test/**/*.js'}
    ],
    testFramework: 'ava',
    env: {
      type: 'node',
      runner: 'node'
    },
    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },
    debug: false
  }
}