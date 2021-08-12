/**
 * 汉字转拼音
 * @author Li
 */
import { pinyin } from './constpy.js'

export function chineseToPinYin(l1) {
  var l2 = l1.length
  var I1 = ''
  var reg = new RegExp('[a-zA-Z0-9]')
  for (var i = 0; i < l2; i++) {
    var val = l1.substr(i, 1)
    var name = arraySearch(val, pinyin)
    if (reg.test(val)) {
      I1 += val
    } else if (name !== false) {
      I1 += name
    }
  }
  I1 = I1.replace(/ /g, '-')
  while (I1.indexOf('--') > 0) {
    I1 = I1.replace('--', '-')
  }
  return I1
}
function arraySearch(l1) {
  for (var name in pinyin) {
    if (pinyin[name].indexOf(l1) !== -1) {
      return ucfirst(name)
    }
  }
  return false
}
function ucfirst(l1) {
  if (l1.length > 0) {
    var first = l1.substr(0, 1).toUpperCase()
    var spare = l1.substr(1, l1.length)
    return first + spare
  }
}
