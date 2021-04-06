import React from 'react'
import { getData } from './utils'
import Provider from './components/provider'

import styles from './app.css'

console.log(styles)

export default () => {
    return (
        <Provider styles={styles}>
            <div className="container">
                <h1>Hello World <em>there</em></h1>
                <span>{getData()}</span>
            </div>
        </Provider>
    )
}