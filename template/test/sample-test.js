import test from 'ava'
import Parser from '../src'

test('basic-addition', t => {
  var parser = new Parser()
  parser.feed('1 + 1')
  var value = parser.results
  var expected = {"type":"main","d":[null,{"type":"A","d":[{"v":1},null,"+",null,{"v":1}],"v":2},null],"v":2}
  t.deepEqual(value, expected, 'Parsed value does not match expected result')
})