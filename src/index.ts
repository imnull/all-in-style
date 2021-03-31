import { parse } from 'css'
import { resolve } from 'path'
import { weight, match, compare } from './selector'
import { getRules, getRulesFromFile } from './stylesheet'

const node = { nodeName: 'a', className: 'b', parentNode: { nodeName: 'c', parentNode: { nodeName: 'c' } } }

const matchResult = match('a a.b', node)


const styleText = `
@import "./base1.css";
a a.b {
    border: 1rpx solid #f00;
    color: #000;
}
`

const rules1 = getRulesFromFile(resolve(__dirname, '../base1.css'))

const matchRules = rules1.map(({ selectors, declarations }, index) => {
    const bingos = selectors.filter(selector => match(selector, node))
    let selector = ''
    if(bingos.length === 1) {
        selector = bingos[0]
    } else if(bingos.length > 1) {
        selector = bingos.sort((a, b) => compare(weight(b), weight(a)))[0]
    }
    return selector ? { selector, declarations, weight: weight(selector), index } : null
}).filter(n => !!n)

// const rules2 = getRules(styleText, resolve(__dirname, '../'))

console.log(matchRules)