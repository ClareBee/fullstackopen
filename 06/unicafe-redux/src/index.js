import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import feedbackReducer from './reducers/reducer'
import App from './app'
import './index.css'

const store = createStore(feedbackReducer)

const renderApp = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)
