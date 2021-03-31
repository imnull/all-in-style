export type TWeight = [number, number, number, number]
export type TDOMNode = {
    nodeName: string
    nodeType?: number
    id?: string
    className?: string | string[]
    pseudo?: string
    pseudoElement?: string
    attributes?: { name: string, value: any }
    previousSibling?: TDOMNode
    nextSibling?: TDOMNode
    parentNode?: TDOMNode
}