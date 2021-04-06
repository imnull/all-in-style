import React from 'react'
import { getData } from './utils'
import Provider from './components/provider'

import styles from './app.css'

export default () => {
    return (
        <Provider styles={styles}>
            <div className="container">
                <h1>Hello World <em>there</em></h1>
                <h4>{getData()}</h4>
            </div>
        </Provider>
    )
}