import React from 'react'
import { compute } from 'css-computer'

const isComponent = v => v && typeof v === 'object' && typeof v.$$typeof === 'symbol'
const isList = v => Array.isArray(v)

let ID = 0
const newKey = () => `_id_${++ID}`

const parseComponentInstance = (instance, styles, parentNode = null, customKey = null) => {
    if(isComponent(instance)) {
        const { type, ref, props, key } = instance
        const _key = customKey || key || newKey()
        const { className = '', style = null, children, ...rest } = props
        const dom = { className, style, styles, nodeName: type, parentNode }
        return (
            <Wrapper key={_key} styles={styles} dom={dom} componentType={type} componentProps={rest} componentRef={ref}>{
                // React.createElement(
                //     type,
                //     { ...rest, ref },
                //     parseComponentInstance(children, styles, dom)
                // )
                parseComponentInstance(children, styles, dom)
            }</Wrapper>
        )
    } else if(isList(instance)) {
        const baseKey = customKey || newKey()
        return instance.map((child, i) => {
            return parseComponentInstance(child, styles, parentNode, `${baseKey}_${i}`)
        })
    } else {
        return instance
    }
}

class Wrapper extends React.Component {
    render() {
        const { styles, dom, children, componentType, componentProps, componentRef } = this.props
        const style = compute(styles, dom)
        return React.createElement(componentType, { ...componentProps, style, ref: componentRef }, children)
    }
}

export default class Provider extends React.Component {
    render() {
        const { styles, children } = this.props
        return parseComponentInstance(children, styles, null)
    }
}