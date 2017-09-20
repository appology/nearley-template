import prettyjson from 'prettyjson'
import Parser from './parser'

var parser = new Parser()
parser.feed('1+1')
var value = parser.results
//console.log(JSON.stringify(value))
console.log(prettyjson.render(value))