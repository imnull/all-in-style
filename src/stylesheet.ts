import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'

import { parse } from 'css'

const trimQuote = (s: any) => {
    if(typeof s !== 'string' || s.length < 2) {
        return s
    }
    s = s.trim()
    if(/^(["'])[\w\W]*\1$/.test(s)) {
        s = s.slice(1, -1)
    }
    return s
}

const css2js = (s: any) => {
    if(typeof s !== 'string') {
        return s
    }
    return s.replace(/\-[a-z]/g, m => m.charAt(1).toUpperCase())
}

const convertDeclaration = (declarations: any) => {
    if(!Array.isArray(declarations)) {
        return {}
    }
    return declarations.map(declaration => {
        if(!declaration || declaration.type !== 'declaration') {
            return {}
        }
        return { [css2js(declaration.property)]: declaration.value }
    }).reduce((r, v) => ({ ...r, ...v }), {})
}

const convertRules = (rules: any[]) => {
    return rules.map(({ selectors, declarations }) => {
        declarations = convertDeclaration(declarations)
        return { selectors, declarations }
    })

    // return rules.map(({ selectors, declarations }) => {
    //     declarations = convertDeclaration(declarations)
    //     return selectors.map((selector: string) => ({ selector, declarations }))
    // }).reduce((r, v) => ([ ...r, ...v]), [])
}

const getAllRules = (cssText: string) => {
    const ast = parse(cssText)
    if(ast.type === 'stylesheet' && ast.stylesheet) {
        const { stylesheet: { rules = [] } = {} } = ast
        return rules
    } else {
        return []
    }
}

export const getRules = (cssText: string, pathContext: string) => {
    const allRules = getAllRules(cssText)
    const imports = allRules.filter(r => r.type === 'import')
    const trap: string[] = []
    const importRules: any[] = imports.map((item) => {
        return resolve(pathContext, trimQuote((item as any).import))
    }).map(f => getRulesFromFile(f, trap)).reduce((r, v) => [ ...r, ...v ], [])
    const rules = allRules.filter(r => r.type === 'rule')
    return convertRules([ ...importRules, ...rules ])
}



export const getRulesFromFile = (filename: string, trap: string[] = []): { selectors: string[], declarations: { [key: string]: string } }[] => {
    if(!existsSync(filename) || trap.includes(filename)) {
        return []
    }
    trap.push(filename)
    const cssText = readFileSync(filename, 'utf-8')
    const allRules = getAllRules(cssText)
    const imports = allRules.filter(r => r.type === 'import')
    const dir = dirname(filename)
    const importRules: any[] = imports.map((item) => {
        return resolve(dir, trimQuote((item as any).import))
    }).map(f => getRulesFromFile(f, trap)).reduce((r, v) => [ ...r, ...v ], [])
    const rules = allRules.filter(r => r.type === 'rule')
    return [ ...importRules, ...convertRules(rules) ]
}

