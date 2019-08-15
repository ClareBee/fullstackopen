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
    <div className="container">
      <div className="buttons">
        <button className="good" onClick={good}>good</button>
        <button className="neutral" onClick={ok}>neutral</button>
        <button className="bad" onClick={bad}>bad</button>
        <button className="reset" onClick={reset}>reset stats</button>
      </div>
      <div className="results">
        <div className="result-row">Good: <span>{store.getState().good}</span></div>
        <div className="result-row">Neutral: <span>{store.getState().ok}</span></div>
        <div className="result-row">Bad: <span>{store.getState().bad}</span></div>
      </div>
    </div>
  )
}

export default App
