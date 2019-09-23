import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import * as serviceWorker from './serviceWorker'

import App from './App'

import './assets/css/index.scss'


ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
)

// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
