import React from 'react'

const App = (props) => {
  const store = props.store

  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'RESET'
    })
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

export default App
